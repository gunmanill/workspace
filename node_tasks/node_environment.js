module.exports = function (grunt) {

	var path = require('path');
	var fs = require('fs');
	var _ = require('underscore');

	// при сборке проекта в продакшен
	// меняем путь  yeoman.pathRoot

	grunt.registerTask('updateBuildPath', 'updateBuildPath', function () {
		// меняем путь до статики
		// нужно для сборки в продакшен
		grunt.config('yeoman.pathRoot', 'public/www');
		grunt.config('yeoman.environment', 'production');
	});
};