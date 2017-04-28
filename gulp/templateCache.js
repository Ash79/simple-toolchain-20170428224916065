'use strict';

var gulp = require('gulp'),
    config = require('../gulpfile.config'),
    $ = require('gulp-load-plugins')({ lazy: true, rename: { 'gulp-angular-templatecache': 'templatecache' } });

exports.task = function () {

    return gulp.src([config.paths.clientHTML, '!client/app/**/*.spec.js'])
        .pipe($.htmlmin({
            collapseWhitespace: true,
            collapseBooleanAttributes: true,
            removeComments: true
        }))
        .pipe($.templatecache('templates.js', { module: 'Soju' }))
        .pipe(gulp.dest(config.paths.dist));

};