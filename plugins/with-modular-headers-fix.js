/**
 * Expo config plugin: fix RN Firebase v22 + Expo SDK 55 + useFrameworks: static
 * non-modular header issue.
 *
 * EAS build error before this plugin:
 *   include of non-modular header inside framework module 'RNFBApp.*':
 *   '/Users/expo/workingdir/build/ios/Pods/Headers/Public/React-Core/React/RCTConvert.h'
 *
 * Fix: append CLANG_ALLOW_NON_MODULAR_INCLUDES_IN_FRAMEWORK_MODULES = YES to
 * every target's build_settings in the Podfile post_install hook. This is
 * the canonical workaround documented in RN Firebase issue tracker.
 *
 * Last working: 2026-05-08, Expo SDK 55.0.0, RNFB 22.4.x.
 */
const { withDangerousMod } = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');

const MARKER = '# RNFB-non-modular-headers-fix-marker';

const PATCH = `
${MARKER}
post_install do |installer|
  installer.pods_project.targets.each do |target|
    target.build_configurations.each do |config|
      config.build_settings['CLANG_ALLOW_NON_MODULAR_INCLUDES_IN_FRAMEWORK_MODULES'] = 'YES'
    end
  end
end
`;

module.exports = function withModularHeadersFix(config) {
  return withDangerousMod(config, [
    'ios',
    async (cfg) => {
      const podfilePath = path.join(cfg.modRequest.platformProjectRoot, 'Podfile');
      if (!fs.existsSync(podfilePath)) return cfg;
      let podfile = fs.readFileSync(podfilePath, 'utf8');
      if (podfile.includes(MARKER)) return cfg;
      podfile = podfile.trimEnd() + '\n' + PATCH;
      fs.writeFileSync(podfilePath, podfile);
      return cfg;
    },
  ]);
};
