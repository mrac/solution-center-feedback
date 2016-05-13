var fs = require('fs');
var connect = require('gulp-connect');
var gulp = require('gulp');
var karma = require('karma').server;
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var es = require('event-stream');
var del = require('del');
var uglify = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');
var minifyCSS = require('gulp-minify-css');
var templateCache = require('gulp-angular-templatecache');
var plumber = require('gulp-plumber');
var open = require('gulp-open');
var sass = require('gulp-sass');
var order = require("gulp-order");
var flatten = require("gulp-flatten");
var eslint = require('gulp-eslint');

gulp.task('connect', function() {
  connect.server({
    root: '.',
    livereload: true
  });
});

gulp.task('html', function () {
  gulp.src(['./demo/*.html', 'src/*.html'])
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(['./demo/**/*.html'], ['html']);
  gulp.watch(['./**/*.scss'], ['build']);
  gulp.watch(['./src/**/*.js','./demo/**/*.js', './**/*.html'], ['build']);
});

gulp.task('clean', function(cb) {
  del(['dist'], cb);
});

gulp.task('scripts', function() {
  function buildTemplates() {
    return gulp.src('src/**/*.html')
      .pipe(minifyHtml({
             empty: true,
             spare: true,
             quotes: true
            }))
      .pipe(templateCache({module: 'solutionCenter.feedback'}));
  };

  function buildDistJS(){
    return gulp.src('src/**/*.js')
      .pipe(plumber({
        errorHandler: handleError
      }));
  };

  es.merge(buildDistJS(), buildTemplates())
    .pipe(plumber({
      errorHandler: handleError
    }))
    .pipe(order([
      'solution-center-feedback.js',
      'template.js'
    ]))
    .pipe(concat('solution-center-feedback.js'))
    .pipe(gulp.dest('dist'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify({preserveComments: 'some'}))
    .pipe(gulp.dest('./dist'))
    .pipe(connect.reload());
});


gulp.task('styles', function() {
  return gulp.src('src/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist'))
    .pipe(minifyCSS())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload());
});

gulp.task('images', function () {
  return gulp.src('src/img/*')
    .pipe(gulp.dest('dist/img/'))
    .pipe(connect.reload());
});

gulp.task('fonts', function () {
  return gulp.src('bower_components/dress-code/**/*.{eot,ttf,woff}')
    .pipe(flatten())
    .pipe(gulp.dest('dist/fonts/'))
    .pipe(connect.reload());
});

gulp.task('open', function(){
  gulp.src('./demo/demo.html')
  .pipe(open('', {url: 'http://localhost:8080/demo/demo.html'}));
});

gulp.task('lint', function () {
  return gulp.src('src/*.js')
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failAfterError());
});

gulp.task('lint-test', function(){
  return gulp.src('./test/**/*.js')
      .pipe(eslint());
});

gulp.task('karma', ['build'], function (done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done);
});

gulp.task('karma-serve', ['build'], function(done){
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: false
  }, done);
});

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
};

gulp.task('build', ['lint', 'scripts', 'styles', 'fonts', 'images']);
gulp.task('serve', ['build', 'connect', 'watch', 'open']);
gulp.task('default', ['build', 'test']);
gulp.task('test', ['build', 'lint-test', 'karma']);
gulp.task('serve-test', ['build', 'watch', 'lint-test', 'karma-serve']);
