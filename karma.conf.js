const webpackConfig = require('./config/webpack.test');
console.log(webpackConfig);

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      './node_modules/jquery/dist/jquery.min.js',
      './node_modules/angular/angular.min.js',
      './node_modules/angular-cookies/angular-cookies.min.js',
      './node_modules/angular-mocks/angular-mocks.js',
      './node_modules/core-js/client/shim.min.js',
      './node_modules/solution-center-communicator/dist/solutioncenter.communicator.min.js',
      'test/index.ts'
    ],
    exclude: [
      './node_modules'
    ],
    preprocessors: {
      'test/index.ts': ['webpack', 'sourcemap']
    },
    webpack: {
      module: webpackConfig.module,
      resolve: webpackConfig.resolve,
      devtool: 'inline-source-map'
    },
    reporters: ['progress', 'coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: true,
    concurrency: Infinity,
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
