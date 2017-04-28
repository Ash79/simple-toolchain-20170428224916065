'use strict';

var gulp = require('gulp'),
    config = require('../gulpfile.config.js'),
    $ = require('gulp-load-plugins')({ lazy: true, rename: { 'gulp-sass-lint': 'sassLint' } });

exports.task = function () {
    // Using sass-lint to lint scss usng a configuration file for the linting rules
    var sassLintOptions = {
        configFile: '.sass-lint.yml'
    };
    return gulp.src(config.paths.scss) //
        .pipe($.sassLint({ options: sassLintOptions }))
        // format() outputs the lint results to the console.
        .pipe($.sassLint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe($.sassLint.failOnError());
};