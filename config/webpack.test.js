const webpack = require('webpack');
const loaders = require('./loaders');

module.exports = {
  entry: ['./src/index.ts'],
  output: {
    path: 'tmp',
    filename: 'test.js'
  },
  resolve: {
    root: __dirname,
    extensions: ['', '.ts', '.js', '.json']
  },
  module: {
    loaders: loaders,
    preLoaders: [
      {test: /\.ts$/, loader: 'tslint'}
    ],
    postLoaders: [
      {
        test: /^((?!\.spec\.ts).)*.ts$/,
        exclude: /(node_modules)/,
        loader: 'istanbul-instrumenter'
      }
    ]
  }
};
