module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Required for Reanimated 4 — must be last
      'react-native-worklets/plugin',
    ],
  };
};
