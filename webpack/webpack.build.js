var loaders = require('./loaders');
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
      compress: {
        angular: true,
        warnings: false
      },
      mangle: true,
      comments: false
    })
  ],
  module:{
    loaders: loaders
  }
};
