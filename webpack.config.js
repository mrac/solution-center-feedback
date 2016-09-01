const webpack = require('webpack');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UnminifyPlugin = require('unminified-webpack-plugin');
const path = require('path');

module.exports = {
  entry: ['./demo/index.ts', './src/index.ts'],
  output: {
    path: __dirname + '/dist',
    filename: 'solutioncenter.feedback.min.js'
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
    alias: {
      'solution-center-communicator': 'solution-center-communicator/src/solutioncenter.communicator.js'
    }
  },
  module: {
    preLoaders: [
      {test: /\.ts$/, loader: 'tslint'}
    ],
    loaders: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.ts(x?)$/, loader: 'ts-loader' },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.scss$/, loader: 'style!css!sass' },
      { test: /\.html$/, exclude: /node_modules/, loader: 'raw' },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' }
    ],
    postLoaders: [
      {
        test: /^((?!\.spec\.ts).)*.ts$/,
        exclude: /(node_modules)/,
        loader: 'istanbul-instrumenter'
      }
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
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      output: { comments: false }
    }),
    new UnminifyPlugin()
  ]
};
