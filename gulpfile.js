var gulp = require('gulp');
var less = require('gulp-less');
var browserSync = require('browser-sync').create();
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var pkg = require('./package.json');

// Set the banner content
var banner = [
  '/*!\n',
  ' * Start Bootstrap - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
  ' * Copyright 2013-' + new Date().getFullYear(),
  ' <%= pkg.author %>\n',
  ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n',
  ' */\n',
  ''
].join('');

// Compile LESS files from /less into /css
gulp.task('less', function() {
  return gulp
    .src('less/freelancer.less')
    .pipe(less())
    .pipe(header(banner, { pkg: pkg }))
    .pipe(gulp.dest('tmp'))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});

// Minify compiled CSS
gulp.task('minify-css', ['less'], function() {
  return gulp
    .src('tmp/freelancer.css')
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('build/css'))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});

// Minify JS
gulp.task('minify-js', function() {
  return gulp
    .src('js/freelancer.js')
    .pipe(uglify())
    .pipe(header(banner, { pkg: pkg }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('build/js'))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});

// Copy vendor libraries from /node_modules into /vendor
gulp.task('copy', function() {
  gulp.src(['node_modules/bootstrap/dist/css/bootstrap.min.css']).pipe(gulp.dest('build/bootstrap/css'));
  gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js']).pipe(gulp.dest('build/bootstrap/js'));
  gulp.src(['node_modules/bootstrap/dist/fonts/*']).pipe(gulp.dest('build/bootstrap/fonts'));

  gulp.src(['node_modules/jquery/dist/jquery.min.js']).pipe(gulp.dest('build/jquery'));

  gulp
    .src([
      'node_modules/jquery-i18next/dist/umd/jquery-i18next.min.js',
      'node_modules/i18next-browser-languagedetector/dist/umd/i18nextBrowserLanguageDetector.min.js',
      'node_modules/i18next-xhr-backend/dist/umd/i18nextXHRBackend.min.js'
    ])
    .pipe(gulp.dest('build/i18next'));
});

// Run everything
gulp.task('default', ['less', 'minify-css', 'minify-js', 'copy']);

// Configure the browserSync task
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
});

// Dev task with browserSync
gulp.task('dev', ['browserSync', 'less', 'minify-css', 'minify-js', 'copy'], function() {
  gulp.watch('less/*.less', ['less']);
  gulp.watch(['css/*.css', '!css/*.min.css'], ['minify-css']);
  gulp.watch(['js/*.js', '!js/*.min.js'], ['minify-js']);
  // Reloads the browser whenever HTML or JS files change
  gulp.watch('*.html', browserSync.reload);
  gulp.watch('js/**/*.js', browserSync.reload);
});
