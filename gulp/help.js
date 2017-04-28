'use strict';

var $ = require('gulp-load-plugins')({ lazy: true, rename: { 'gulp-task-listing': 'taskListing'} });

exports.task = function () {
    return $.taskListing();
};
