var fs = require('fs'),
    connect = require('gulp-connect'),
    gulp = require('gulp'),
    karma = require('karma').server,
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    es = require('event-stream'),
    del = require('del'),
    uglify = require('gulp-uglify'),
    minifyHtml = require('gulp-minify-html'),
    minifyCSS = require('gulp-minify-css'),
    templateCache = require('gulp-angular-templatecache'),
    plumber = require('gulp-plumber'),
    open = require('gulp-open'),
    sass = require('gulp-sass'),
    order = require("gulp-order"),
    flatten = require("gulp-flatten"),
    eslint = require('gulp-eslint'),
    tsc = require('gulp-typescript'),
    //tslint = require('gulp-tslint'),
    tsProject = tsc.createProject('tsconfig.json'),
    sourcemaps = require('gulp-sourcemaps'),
    GulpConfig = require('./gulpfile.config');

var config = new GulpConfig();

gulp.task('connect', function () {
  connect.server({
    root: '.',
    livereload: true,
    port: 3500
  });
});

gulp.task('open', function () {
  gulp.src(config.demo + 'demo.html')
      .pipe(open('', {url: 'http://localhost:3500/demo/demo.html'}));
});

gulp.task('html', function () {
  gulp.src([config.demo + '*.html', config.allHtml])
      .pipe(connect.reload());
});

gulp.task('scripts', function () {
  function buildTemplates() {
    return gulp.src(config.allHtml)
        .pipe(minifyHtml({
          empty: true,
          spare: true,
          quotes: true
        }))
        .pipe(templateCache({module: 'solutioncenter.feedback'}));
  };

  function buildDistJS() {
    return gulp.src(config.allJavaScript)
        .pipe(plumber({
          errorHandler: handleError
        }));
  };

  es.merge(buildDistJS(), buildTemplates())
      .pipe(plumber({
        errorHandler: handleError
      }))
      .pipe(order([
        'solutioncenter.feedback.js',
        'template.js'
      ]))
      .pipe(concat('solutioncenter.feedback.js'))
      .pipe(gulp.dest('dist'))
      .pipe(rename({suffix: '.min'}))
      .pipe(uglify({preserveComments: 'some'}))
      .pipe(gulp.dest('./dist'))
      .pipe(connect.reload());
});

gulp.task('styles', function () {
  return gulp.src(config.sourceStyles + '**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(concat('solutioncenter.feedback.css'))
      .pipe(gulp.dest(config.distribution))
      .pipe(minifyCSS())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest(config.distribution))
      .pipe(connect.reload());
});

/**
 * Lint all custom JavaScript files.
 */
gulp.task('js-lint', function () {
  return gulp.src(config.allJavaScript)
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failAfterError());
});

gulp.task('lint-test', function () {
  return gulp.src(config.tests + '**/*.js')
      .pipe(eslint());
});

/**
 * Lint all custom TypeScript files.
 */
gulp.task('ts-lint', function () {
  return;
  //return gulp.src(config.allTypeScript)
  //    .pipe(tslint())
  //    .pipe(tslint.report('prose'));
});

/**
 * Compile TypeScript and include references to library and app .d.ts files.
 */
gulp.task('compile-ts', function () {
  var sourceTsFiles = [config.allTypeScript, config.libraryTypeScriptDefinitions];

  var tsResult = gulp.src(sourceTsFiles)
      .pipe(sourcemaps.init())
      .pipe(tsc(tsProject));

  tsResult.dts.pipe(gulp.dest(config.tsOutputPath));
  return tsResult.js
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(config.tsOutputPath));
});

gulp.task('watch', function () {
  gulp.watch([config.allTypeScript], ['ts-lint', 'compile-ts']);
  gulp.watch([config.demo + '**/*.html'], ['html']);
  gulp.watch(['./**/*.scss'], ['build']);
  gulp.watch([config.source + '**/*.js', config.demo + '**/*.js', './**/*.html'], ['build']);
});

/**
 * Removes the distribution files and all generated JavaScript files from TypeScript compilation.
 */
gulp.task('clean', function (cb) {
  var filesToClean = [
    config.distribution,
    config.tsOutputPath
  ];

  del(filesToClean, cb);
});

/**
 * KARMA TESTS
 */
gulp.task('karma', ['build'], function (done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done);
});

gulp.task('karma-serve', ['build'], function (done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: false
  }, done);
});

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
};

//gulp.task('build', ['ts-lint', 'compile-ts', 'scripts', 'styles']);
gulp.task('build', ['ts-lint', 'compile-ts', 'scripts', 'styles']);
gulp.task('serve', ['build', 'connect', 'watch', 'open']);
gulp.task('test', ['build', 'lint-test', 'karma']);
gulp.task('serve-test', ['build', 'watch', 'lint-test', 'karma-serve']);
