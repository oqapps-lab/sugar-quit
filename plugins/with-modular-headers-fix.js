/**
 * Expo config plugin: fix RN Firebase v22 + Expo SDK 55 + useFrameworks: static
 * non-modular header issue.
 *
 * EAS build error before this plugin:
 *   include of non-modular header inside framework module 'RNFBApp.*':
 *   '/Users/expo/workingdir/build/ios/Pods/Headers/Public/React-Core/React/RCTConvert.h'
 *
 * Fix: inject CLANG_ALLOW_NON_MODULAR_INCLUDES_IN_FRAMEWORK_MODULES = YES
 * INSIDE the existing post_install block that Expo prebuild already generates.
 * Adding a second post_install at the end of Podfile breaks pod install.
 *
 * Last working: 2026-05-08, Expo SDK 55.0.0, RNFB 22.4.x.
 */
const { withDangerousMod } = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');

const MARKER = '# RNFB-non-modular-headers-fix-marker';

const INJECTION = `    # ${MARKER.replace('# ', '')}
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
      if (podfile.includes(MARKER.replace('# ', ''))) return cfg;

      // Find the existing `post_install do |installer|` block and inject inside it.
      const re = /(post_install\s+do\s+\|installer\|\s*\n)/m;
      if (re.test(podfile)) {
        podfile = podfile.replace(re, `$1${INJECTION}\n\n`);
      } else {
        // Fallback: no post_install block exists — append a minimal one.
        podfile += `\npost_install do |installer|\n${INJECTION}\nend\n`;
      }
      fs.writeFileSync(podfilePath, podfile);
      return cfg;
    },
  ]);
};
