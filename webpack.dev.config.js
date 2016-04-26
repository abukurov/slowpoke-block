'use strict';

var path = require('path');

module.exports = {

  entry: {
    options: './src/options.js',
    background: './src/background.js',
    content: './src/content.js'
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },

  module: {
    loaders: [{
      test: /\.js$/,
      include: path.join(__dirname, 'src'),
      loader: 'babel?cacheDirectory'
    }]
  }

};
