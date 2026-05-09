/**
 * Verbatim from Vitaminico launch playbook (verified working 2026-05-08).
 * See /Users/evgenij/Desktop/work/APP_DEVELOPMENT/_LAUNCH_PLAYBOOK/skill/SKILL.md
 * Pitfall #4 for context.
 *
 * Fix: inject CLANG_ALLOW_NON_MODULAR_INCLUDES_IN_FRAMEWORK_MODULES = YES
 * INSIDE the existing post_install block in the Expo-prebuild Podfile.
 *
 * DO NOT add use_modular_headers! — that breaks worse.
 * DO NOT add a second post_install block — pod install crashes.
 * DO NOT useFrameworks: dynamic — Firebase Swift pods refuse to link.
 *
 * Two-part fix per playbook:
 *   1. RNFB pinned to 22.4.0 exactly (NOT v23+, last version without strict enforcement)
 *   2. This plugin
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
      const re = /(post_install\s+do\s+\|installer\|\s*\n)/m;
      if (re.test(podfile)) {
        podfile = podfile.replace(re, `$1${INJECTION}\n\n`);
      } else {
        podfile += `\npost_install do |installer|\n${INJECTION}\nend\n`;
      }
      fs.writeFileSync(podfilePath, podfile);
      return cfg;
    },
  ]);
};
