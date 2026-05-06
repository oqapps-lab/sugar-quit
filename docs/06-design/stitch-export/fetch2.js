const https = require('https');
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

function getToken() {
  if (process.env.TOKEN) return process.env.TOKEN.trim();
  const result = process.platform === 'win32'
    ? spawnSync('powershell.exe', ['-Command', '& {& "C:/Users/Artur/AppData/Local/Google/Cloud SDK/google-cloud-sdk/bin/gcloud.cmd" auth application-default print-access-token}'], { encoding: 'utf8' })
    : spawnSync('gcloud', ['auth', 'application-default', 'print-access-token'], { encoding: 'utf8' });
  const token = (result.stdout || '').trim();
  if (!token) {
    console.error('Failed to get gcloud token:', result.stderr || result.error?.message);
    console.error('Run: gcloud auth login  OR  TOKEN=... node fetch2.js');
    process.exit(1);
  }
  return token;
}

const PROJECT_ID = '662765322743478838';
const OUT_DIR = path.join(__dirname, '..', 'stitch-raw', 'screenshots');

const SCREENS = [
  { slug: '03-sos-ai-coach',  title: 'SOS AI Coach - Extended Height', id: 'a1bf162993304e7684b4684325f84418' },
];

function postJson(url, body, headers) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const data = Buffer.from(JSON.stringify(body));
    const req = https.request({
      hostname: u.hostname,
      path: u.pathname + u.search,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': data.length, 'Accept': 'application/json, text/event-stream', ...headers },
    }, (res) => {
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve({ status: res.statusCode, body: Buffer.concat(chunks).toString('utf8') }));
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

function download(url, destPath) {
  return new Promise((resolve, reject) => {
    const go = (u, depth) => {
      if (depth > 5) return reject(new Error('too many redirects'));
      https.get(u, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          res.resume();
          return go(res.headers.location, depth + 1);
        }
        if (res.statusCode !== 200) {
          res.resume();
          return reject(new Error(`HTTP ${res.statusCode} for ${u}`));
        }
        const f = fs.createWriteStream(destPath);
        res.pipe(f);
        f.on('finish', () => f.close(resolve));
        f.on('error', reject);
      }).on('error', reject);
    };
    go(url, 0);
  });
}

async function getScreen(screenId, token) {
  const res = await postJson(
    'https://stitch.googleapis.com/mcp',
    { jsonrpc: '2.0', id: 1, method: 'tools/call', params: { name: 'get_screen', arguments: { name: `projects/${PROJECT_ID}/screens/${screenId}` } } },
    { 'Authorization': `Bearer ${token}`, 'x-goog-user-project': 'fb-3932849' }
  );
  if (res.status !== 200) throw new Error(`HTTP ${res.status}: ${res.body}`);
  const outer = JSON.parse(res.body);
  if (outer.result?.isError) throw new Error(outer.result.content?.[0]?.text || 'MCP error');
  const inner = JSON.parse(outer.result.content[0].text);
  return inner;
}

(async () => {
  const token = getToken();
  const manifest = [];
  for (const s of SCREENS) {
    process.stdout.write(`[${s.slug}] `);
    try {
      const data = await getScreen(s.id, token);
      const pngPath = path.join(OUT_DIR, `${s.slug}.png`);
      const htmlPath = path.join(OUT_DIR, `${s.slug}.html`);
      const jsonPath = path.join(OUT_DIR, `${s.slug}.meta.json`);

      if (data.screenshot?.downloadUrl) {
        await download(data.screenshot.downloadUrl, pngPath);
        process.stdout.write('png ');
      }
      if (data.htmlCode?.downloadUrl) {
        await download(data.htmlCode.downloadUrl, htmlPath);
        process.stdout.write('html ');
      }
      fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
      process.stdout.write('meta\n');
      manifest.push({ slug: s.slug, title: s.title, id: s.id, ok: true });
    } catch (e) {
      console.log(`FAILED: ${e.message}`);
      manifest.push({ slug: s.slug, title: s.title, id: s.id, ok: false, error: e.message });
    }
  }
  // append to existing manifest
  const manifestPath = path.join(OUT_DIR, 'manifest.json');
  const existing = fs.existsSync(manifestPath) ? JSON.parse(fs.readFileSync(manifestPath, 'utf8')) : [];
  fs.writeFileSync(manifestPath, JSON.stringify([...existing, ...manifest], null, 2));
  console.log('\nDone.');
})();
