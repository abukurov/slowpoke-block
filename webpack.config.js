'use strict';

const path = require('path');
var webpack = require('webpack');
const config = require('./webpack.dev.config');

config.plugins = [
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({
    screwIe8: true,
    compress: {
      warnings: false
    }
  })
];

config.output.path = path.join(__dirname, 'dist');

module.exports = config;
