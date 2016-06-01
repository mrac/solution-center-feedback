'use strict';
var GulpConfig = (function () {
  function gulpConfig() {
    this.source = './src/';
    this.sourceApp = this.source + 'app/';
    this.sourceStyles = this.source + 'styles/';
    this.sourceViews = this.source + 'views/';

    this.tsOutputPath = this.source + '/js';
    this.allJavaScript = [this.source + '/js/**/*.js'];
    this.allTypeScript = this.sourceApp + '/**/*.ts';
    this.allHtml = this.sourceViews + '*.html';

    this.typings = './typings/';
    this.libraryTypeScriptDefinitions = './typings/**/*.ts';

    this.distribution = './dist/';
    this.tests = './tests/'
    this.demo = './demo/'
  }
  return gulpConfig;
})();
module.exports = GulpConfig;
