const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

config.resolver.unstable_enablePackageExports = true;

// On web, swap react-native-worklets for a no-op stub.
// The worklets babel plugin is already skipped for web in babel.config.js,
// but the runtime module itself also contains import.meta and must be replaced.
const _resolve = config.resolver.resolveRequest;
config.resolver.resolveRequest = (ctx, moduleName, platform) => {
  if (
    platform === 'web' &&
    (moduleName === 'react-native-worklets' ||
      moduleName.startsWith('react-native-worklets/'))
  ) {
    return {
      type: 'sourceFile',
      filePath: path.resolve(__dirname, 'mocks/worklets-web.js'),
    };
  }
  return _resolve
    ? _resolve(ctx, moduleName, platform)
    : ctx.resolveRequest(ctx, moduleName, platform);
};

module.exports = config;
