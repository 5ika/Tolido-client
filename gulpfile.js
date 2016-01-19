'use strict';
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var csslint = require('gulp-csslint');
var minifyCss = require('gulp-minify-css'); // Gulp css nano ?
var sass = require('gulp-sass');
var bundle = require('gulp-module-bundle');
var todo = require('gulp-todo');
var eslint = require('gulp-eslint');
// Ne pas oublier d'installer jshint-stylish

// define the default task and add the watch task to it
gulp.task('default', ['watch']);

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function () {
  //  gulp.watch('source/js/*.js', ['build-js']);
  gulp.watch('source/css/*.css', ['minify-css']);
  gulp.watch('source/sass/*.sass', ['build-css']);
  gulp.watch('source/js/**/*', ['bundle']);
});

/**
 * Lint
 */

// JS Lint
gulp.task('jshint', function () {
  return gulp.src('source/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('jshint-server', function () {
  return gulp.src(['*.js', 'routes/*.js', 'models/*.js', 'config/*.js', 'bin/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

// CSS Lint
gulp.task('csslint', function () {
  gulp.src('source/css/*.css')
    .pipe(csslint())
    .pipe(csslint.reporter());
});

gulp.task('minify-js', function () {
  return gulp.src('public/js/tolido.js')
    .pipe(uglify())
    .pipe(gulp.dest('public/js/'));
});

gulp.task('build-css', function () {
  return gulp.src('source/sass/*.sass')
    .pipe(sourcemaps.init()) // Process the original sources
    .pipe(sass())
    .pipe(sourcemaps.write()) // Add the map to modified source.
    .pipe(gulp.dest('public/css'));
});

gulp.task('minify-css', function () {
  return gulp.src('public/css/*.css')
    .pipe(minifyCss())
    .pipe(gulp.dest('public/css'));
});

gulp.task('bundle', function () {
  return gulp.src('source/js/*.js')
    .pipe(bundle())
    .pipe(gulp.dest('public/js/'));
});

// JS ESLint
gulp.task('eslint', function () {
  return gulp.src('source/js/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

/**
 * Tools
 */
// generate a todo.md from your javascript files
gulp.task('todo', function () {
  gulp.src('source/js/**/*.js')
    .pipe(todo())
    .pipe(gulp.dest('./'));
  // -> Will output a TODO.md with your todos
});
