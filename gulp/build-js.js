'use strict';

var gulp = require('gulp'),
    config = require('../gulpfile.config'),
    $ = require('gulp-load-plugins')({ lazy: true });

exports.dependencies = ['templateCache'];

exports.task = function() {

    return gulp.src([config.paths.clientJS, '!client/app/**/*.spec.js'])
		.pipe($.concat('scripts.js'))
		.pipe($.uglify())
		.pipe(gulp.dest(config.paths.dist))
		.pipe($.livereload());

};
