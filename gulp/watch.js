'use strict';

var gulp = require('gulp'),
    config = require('../gulpfile.config'),
    $ = require('gulp-load-plugins')({ lazy: true });

exports.task = function() {

    $.livereload.listen();
    gulp.watch([config.paths.templates, config.paths.pathsToLint], ['build-js', 'lint']);
    gulp.watch([config.paths.scss], ['build-css']);

};
