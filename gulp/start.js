'use strict';

var $ = require('gulp-load-plugins')({ lazy: true });


exports.task = function() {

    $.nodemon({ script: 'server/app.js'});

};
