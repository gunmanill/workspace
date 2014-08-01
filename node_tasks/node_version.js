module.exports = function (grunt) {

	var path = require('path');
	var fs = require('fs');
	var _ = require('underscore');

	grunt.task.registerTask('createVersion', '', function (arg1, arg2) {

		var yeoman = grunt.config.get('yeoman');
		grunt.file.defaultEncoding = 'utf8';

		var pathStaticFile = 'data/templates/static-files.json';
		var pathFileXmlVersion = 'data/xsl/version.xml';

		try {
			var fileData = grunt.file.read(pathStaticFile);
			writeVersion(fileData);
		} catch (e) {
			writeVersion('');
		}


		function writeVersion(fileData){
			if (_.isString(fileData) && !fileData.length) {
				fileData = {};
			} else {
				fileData = JSON.parse(fileData);
			}

			fileData.version = (grunt.option('get_git')) ? grunt.option('get_git') : "";

			grunt.file.write(pathStaticFile, JSON.stringify(fileData));


			var xml = '<?xml version="1.0" encoding="utf-8" ?>' +
				'<version v="'+ grunt.option('get_git') +'"></version>';

			grunt.file.write(pathFileXmlVersion, xml);
		}


	});
};