// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

module.exports = {
    resolver: {
      assetExts: ['bin', 'txt', 'jpg', 'ttf', 'png', 'm4a'],
      sourceExts: ['js', 'json', 'ts', 'tsx', 'jsx'],
    },
  };