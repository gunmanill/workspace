module.exports = function (grunt) {

	var path = require('path');
	var fs = require('fs');
	var _ = require('underscore');

	var environment = grunt.config.get('yeoman').environment;

	// если напряму вызвана команла uglify, будет брошено исключение
	if(environment == 'develop' && grunt.cli.tasks[0] == 'uglify') {
		grunt.log.error("You cat't start UGLIFY  in develop environment");
		return false;
	}

	grunt.config.set('uglify', {
		'main': {
			files: {
				'<%=yeoman.build %>/production.js': ['<%=yeoman.build %>/production.js']
			}
		}
	});
};