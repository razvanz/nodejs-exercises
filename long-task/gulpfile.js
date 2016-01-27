'use strict';

// Load gulp
const gulp = require('gulp');

// Load plugins
const autoprefixer = require('gulp-autoprefixer');
const bowerFiles = require('main-bower-files');
const less = require('gulp-less');

gulp.task('default', () => {
  gulp.start('build');
});

gulp.task('compile-less', () => {
  return gulp.src('./client/style/*.less')
    .pipe(less())
    .pipe(autoprefixer('last 1 version'))
    .pipe(gulp.dest('./client/style'));
});

gulp.task('bower-styles', () => {
  return gulp.src(bowerFiles({
    paths: {
      bowerDirectory: './client/bower_components',
      bowerrc: '.bowerrc',
      bowerJson: 'bower.json'
    },
    includeDev: true,
    filter: /\.css$/i
  }))
  .pipe(gulp.dest('./client/lib'));
});

gulp.task('bower-scripts', () => {
  return gulp.src(bowerFiles({
    paths: {
      bowerDirectory: './client/bower_components',
      bowerrc: '.bowerrc',
      bowerJson: 'bower.json'
    },
    includeDev: true,
    filter: /\.js$/i
  }))
  .pipe(gulp.dest('./client/lib'));
});

gulp.task('bower-fonts', () => {
  return gulp.src(bowerFiles({
    paths: {
      bowerDirectory: './client/bower_components',
      bowerrc: '.bowerrc',
      bowerJson: 'bower.json'
    },
    includeDev: true,
    filter: /\.eot$|\.svg$|\.ttf$|\.woff$|\.woff2$/i
  }))
  .pipe(gulp.dest('./client/fonts'));
});

gulp.task('bower-files', ['bower-fonts', 'bower-scripts', 'bower-styles']);

gulp.task('build', ['compile-less', 'bower-files']);
