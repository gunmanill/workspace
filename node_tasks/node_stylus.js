module.exports = function (grunt) {

	var path = require('path');
	var fs = require('fs');
	var _ = require('underscore');

	var yeoman = grunt.config.get('yeoman');

	function math_random(obj) {
		var imagePath = yeoman.imagesWebPath + '/' + obj.string;
		//console.log(imagePath);

		var isFile = grunt.file.isFile(imagePath);
		var avoidСache = '';

		if (isFile) {
			avoidСache = Math.random().toString(16);
		} else {
			console.warn(' NOT FOUND: ' + obj.string);
		}

		return avoidСache;
	}


	grunt.config.set('stylus', {
		compile: {
			options: {
				'compress': '--debug',
				'include css': true,
				define: { 'math-random': math_random }

			},
			files: {
				'<%=yeoman.build %>/production.css': '<%=yeoman.dist %>/styl/base.styl'
			}
		}
	});
};