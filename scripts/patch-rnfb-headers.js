#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const rnfbDir = path.join(__dirname, '..', 'node_modules', '@react-native-firebase');
if (!fs.existsSync(rnfbDir)) {
  console.log('[patch-rnfb-headers] node_modules/@react-native-firebase not found, skipping');
  process.exit(0);
}

let patched = 0;
function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === 'node_modules') continue;
      walk(p);
    } else if (e.name.endsWith('.h') || e.name.endsWith('.m')) {
      let src = fs.readFileSync(p, 'utf8');
      const before = src;
      src = src.replace(/^#import\s+<React\/[^>]+\.h>\s*$/gm, '@import React;');
      src = src.replace(/^#import\s+<RCTRequired\/[^>]+\.h>\s*$/gm, '@import RCTRequired;');
      src = src.replace(/^#import\s+<RCTTypeSafety\/[^>]+\.h>\s*$/gm, '@import RCTTypeSafety;');
      if (src !== before) {
        fs.writeFileSync(p, src);
        patched++;
      }
    }
  }
}
walk(rnfbDir);
console.log(`[patch-rnfb-headers] patched ${patched} files`);
