const webpack = require('webpack');
const loaders = require('./loaders');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const dist = path.resolve(__dirname, '..') + '/dist';

module.exports = {
  entry: ['./demo/index.ts', './src/index.ts'],
  output: {
    path: dist,
    filename: 'solutioncenter.feedback.js'
  },
  resolve: {
    extensions: ['', '.ts', '.js', '.json']
  },
  module: {
    loaders: loaders,
    noParse: /node_modules\/solution-center-communicator/,
    preLoaders: [
      { test: /\.ts$/, loader: 'tslint' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './demo/index.html',
      inject: 'body',
      hash: true
    }),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 8080,
      server: {
        baseDir: 'dist'
      },
      ui: false,
      online: false,
      notify: false
    })
  ]
};
