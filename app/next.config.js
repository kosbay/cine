const withCSS = require('@zeit/next-css');
const withLess = require('@zeit/next-less');
const withPlugins = require('next-compose-plugins');

const nextConfig = {};

const cssConfig = {
  importLoaders: 1,
  localIdentName: '[local]___[hash:base64:5]',
  javascriptEnabled: true,
};

const plugins = [
  [withLess, { lessLoaderOptions: cssConfig }],
  [withCSS, { cssLoaderOptions: cssConfig }],
];

module.exports = withPlugins(plugins, nextConfig);
