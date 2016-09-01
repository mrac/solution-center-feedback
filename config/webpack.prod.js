const webpack = require('webpack');
const loaders = require('./loaders');
const path = require('path');
const dist = path.resolve(__dirname, '..') + '/dist';

module.exports = {
  entry: ['./src/index.ts'],
  output: {
    path: dist,
    filename: 'solutioncenter.feedback.min.js'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.ts', '.js', '.json']
  },
  module:{
    loaders: loaders,
    preLoaders: [
      { test: /\.ts$/, loader: 'tslint' }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        angular: true,
        warnings: false
      },
      mangle: true,
      comments: false
    })
  ]
};
