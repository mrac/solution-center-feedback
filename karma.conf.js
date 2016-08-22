require('phantomjs-polyfill');

var webpackConfig = require('./webpack/webpack.test.js');
webpackConfig.entry = {};

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['PhantomJS'],
    singleRun: true,
    autoWatchBatchDelay: 300,
    files: [
      './node_modules/phantomjs-polyfill/bind-polyfill.js',
      './src/test.ts'
    ],
    babelPreprocessor: {
      options: {
          presets: ['es2015']
      }
    },
    preprocessors: {
      'src/test.ts': ['webpack'],
      'src/**/!(*.spec)+(.js)': ['coverage']
    },
    webpackMiddleware: {
      stats: {
        chunkModules: false,
        colors: true
      }
    },
    webpack: webpackConfig,
    reporters: [
      'dots',
      'spec',
      'coverage'
    ],
    coverageReporter: {
      reporters: [
        {
          dir: 'coverage/',
          subdir: '.',
          type: 'html'
        },
        {
          dir: 'coverage/',
          subdir: '.',
          type: 'cobertura'
        },
        {
          dir: 'coverage/',
          subdir: '.',
          type: 'json'
        }
      ]
    }
  });
};
