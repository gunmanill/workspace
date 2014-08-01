module.exports = function (grunt) {

	var path = require('path');
	var fs = require('fs');
	var _ = require('underscore');


	grunt.config.set('cssmin', {
		compress: {
			files: {
				'app/build/css/production.css': ['app/build/css/production.css']
			}
		}
	});
};