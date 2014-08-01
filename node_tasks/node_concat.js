module.exports = function (grunt) {

	var path = require('path');
	var fs = require('fs');
	var _ = require('underscore');

	grunt.config.set('concat', {

		prod: {
			src: [
				"<%=yeoman.build %>/template.js",
				"<%=yeoman.build %>/main.lmd-1.0.0.js"
			],
			dest: '<%=yeoman.build %>/production.js'
		},

		component_styl: {
			src: '<%=yeoman.dist %>/components/**/*.styl',
			dest: '<%=yeoman.dist %>/styl/temp/components.styl'
		},

		regions_styl: {
			src: '<%=yeoman.dist %>/regions/**/*.styl',
			dest: '<%=yeoman.dist %>/styl/temp/regions.styl'
		},

		page_styl: {
			src: '<%=yeoman.dist %>/pages/**/*.styl',
			dest: '<%=yeoman.dist %>/styl/temp/pages.styl'
		}
	});
};