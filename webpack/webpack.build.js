var loaders = require('./loaders');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

module.exports = {
  entry: ['./src/solutioncenter.feedback.ts'],
  output: {
    filename: 'solutioncenter.feedback.js',
    path: 'dist'
  },
  devtool: 'source-map',
  resolve: {
    root: __dirname,
    extensions: ['', '.ts', '.js', '.json']
  },
  resolveLoader: {
    modulesDirectories: ['node_modules']
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      warning: false,
      mangle: true,
      comments: false
    }),
    new HtmlWebpackPlugin({
      template: './demo/index.html',
      inject: 'body',
      hash: true
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'window.jquery': 'jquery'
    })
  ],
  module:{
    loaders: loaders
  }
};
