const https = require('https');
const fs = require('fs');
const path = require('path');

const API_KEY = process.env.STITCH_API_KEY;
const PROJECT_ID = '2348002901540229278';
const OUT_DIR = __dirname;

const SCREENS = [
  { slug: '01-sos-breathe',                    title: 'SOS: Breathe',                   id: '046e4c7a7ef64f48999ab99ee8838ecf' },
  { slug: '02-craving-forecast-a',             title: 'Craving Forecast A',             id: 'c564f8b6d9c64e3389825a6a1ab870cf' },
  { slug: '03-living-dashboard',               title: 'Living Dashboard',               id: 'e74704acc29d404992201bb80fe2045d' },
  { slug: '04-onboarding-why-now',             title: 'Onboarding: Why Now?',           id: '44e15f0fac834c8faa55f9f87c8681a7' },
  { slug: '05-craving-profile',                title: 'Your Craving Profile',           id: 'b3f1d5e1eaf144e5a20faf79833fcfd9' },
  { slug: '06-craving-forecast-b',             title: 'Craving Forecast B',             id: '599475b3106848b5b4c91824bad14f03' },
  { slug: '07-sleep-sugar-insight-v3',         title: 'Sleep & Sugar Insight (V3)',     id: '5a87a61cff354551ab211814998f6ab2' },
  { slug: '08-90-day-horizon',                 title: 'The 90-Day Horizon',             id: '75da9435398d4c32a800ca40c6cd9de9' },
  { slug: '09-craving-forecast-c',             title: 'Craving Forecast C',             id: 'c2b265f3342b43638c7cb6282eaac8d2' },
  { slug: '10-craving-forecast-d',             title: 'Craving Forecast D',             id: 'f0ccf43fad2a47a282bad4e23bab51e4' },
  { slug: '11-craving-forecast-e',             title: 'Craving Forecast E',             id: 'f9d7c9bf54a94d5687ef0faecedc6d70' },
  { slug: '12-daily-wellness-weather',         title: 'Daily Wellness Weather Report',  id: 'ebf9e36602b641fdbe8d94db6b01ffb5' },
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

async function getScreen(screenId) {
  const res = await postJson(
    'https://stitch.googleapis.com/mcp',
    { jsonrpc: '2.0', id: 1, method: 'tools/call', params: { name: 'get_screen', arguments: { name: `projects/${PROJECT_ID}/screens/${screenId}` } } },
    { 'X-Goog-Api-Key': API_KEY }
  );
  if (res.status !== 200) throw new Error(`HTTP ${res.status}: ${res.body}`);
  const outer = JSON.parse(res.body);
  if (outer.result?.isError) throw new Error(outer.result.content?.[0]?.text || 'MCP error');
  const inner = JSON.parse(outer.result.content[0].text);
  return inner;
}

(async () => {
  if (!API_KEY) { console.error('set STITCH_API_KEY'); process.exit(1); }
  const manifest = [];
  for (const s of SCREENS) {
    process.stdout.write(`[${s.slug}] `);
    try {
      const data = await getScreen(s.id);
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
  fs.writeFileSync(path.join(OUT_DIR, 'manifest.json'), JSON.stringify(manifest, null, 2));
  console.log('\nDone.');
})();
