'use strict';

var gulp = require('gulp'),
    config = require('../gulpfile.config'),
    $ = require('gulp-load-plugins')({ lazy: true });


exports.task = function() {

    return gulp.src([
        config.paths.clientJS,
        config.paths.serverJS,
        '!'+config.paths.dist+'/**'
    ])
		// eslint() attaches the lint output to the "eslint" property
		// of the file object so it can be used by other modules.
		.pipe($.eslint())
		// eslint.format() outputs the lint results to the console.
		// Alternatively use eslint.formatEach() (see Docs).
		.pipe($.eslint.format())
		// To have the process exit with an error code (1) on
		// lint error, return the stream and pipe to failAfterError last.
		.pipe($.eslint.failAfterError());

};
