/**
 * Expo config plugin: fix RN Firebase v22 + Expo SDK 55 + useFrameworks: static
 * non-modular header issue.
 *
 * Two-part fix:
 *   1. `use_modular_headers!` globally in Podfile so React-Core et al
 *      expose modular headers that RNFBApp can `@import`.
 *   2. CLANG_ALLOW_NON_MODULAR_INCLUDES_IN_FRAMEWORK_MODULES = YES on every
 *      pod target as belt-and-suspenders.
 *
 * Last working: 2026-05-08, Expo SDK 55.0.0, RNFB 22.4.x.
 */
const { withDangerousMod } = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');

const MARKER = 'RNFB-modular-headers-fix-marker';

const POST_INSTALL_INJECTION = `    # ${MARKER}
    installer.pods_project.targets.each do |target|
      target.build_configurations.each do |bc|
        bc.build_settings['CLANG_ALLOW_NON_MODULAR_INCLUDES_IN_FRAMEWORK_MODULES'] = 'YES'
      end
    end`;

module.exports = function withModularHeadersFix(config) {
  return withDangerousMod(config, [
    'ios',
    async (cfg) => {
      const podfilePath = path.join(cfg.modRequest.platformProjectRoot, 'Podfile');
      if (!fs.existsSync(podfilePath)) return cfg;
      let podfile = fs.readFileSync(podfilePath, 'utf8');
      if (podfile.includes(MARKER)) return cfg;

      // Part 1: add use_modular_headers! globally near the top, after platform line.
      // (Idempotent — only add if not already present.)
      if (!/^use_modular_headers!/m.test(podfile)) {
        // Insert after the first `platform :ios` line if present, else after the first line.
        const platformLine = podfile.match(/^platform\s*:ios.*$/m);
        if (platformLine) {
          podfile = podfile.replace(platformLine[0], `${platformLine[0]}\nuse_modular_headers!`);
        } else {
          podfile = `use_modular_headers!\n${podfile}`;
        }
      }

      // Part 2: inject build setting INSIDE the existing post_install block.
      const re = /(post_install\s+do\s+\|installer\|\s*\n)/m;
      if (re.test(podfile)) {
        podfile = podfile.replace(re, `$1${POST_INSTALL_INJECTION}\n\n`);
      } else {
        podfile += `\npost_install do |installer|\n${POST_INSTALL_INJECTION}\nend\n`;
      }
      fs.writeFileSync(podfilePath, podfile);
      return cfg;
    },
  ]);
};
