'use strict';

var gulp = require('gulp'),
	fs = require('fs');

/* This will load all js files in the gulp directory in order to load all gulp tasks. */

fs.readdirSync('./gulp').filter(function(file) {
  return (/\.(js)$/i).test(file);
}).map(function(file) {
	return {
		name: file.substr(0, file.length - 3),
		contents: require('./gulp/' + file)
	};
}).forEach(function (file) {
	gulp.task(file.name, file.contents.dependencies, file.contents.task);
});

