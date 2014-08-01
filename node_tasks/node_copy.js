module.exports = function (grunt) {

	var path = require('path');
	var fs = require('fs');
	var _ = require('underscore');


	grunt.registerTask('prepareImg', 'iterates over all images directories and compiles app/images/sunDir', function () {

		var yeoman = grunt.config.get('yeoman');
		var files = [];

		var directories = ['pages', 'components', 'regions'];


		grunt.file.expand(yeoman.dist + '/**/*.{gif,png,jpeg,jpg}').forEach(function (dir) {

			var newPathSplit = dir.split('/');
			var copyImages = grunt.config.get('copy.images') || {};
			var newDir = '';

			var subFolder = _.find(newPathSplit, function(subDir){
				return _.contains(directories, subDir);
			});

			if(subFolder) {
				if(_.indexOf(newPathSplit, subFolder)){
					var nextIndex = _.indexOf(newPathSplit, subFolder) + 1;
					newDir = newPathSplit[nextIndex] + '/';
				}
			}

			files.push({
				expand: true,
				flatten : true,
				src: dir,
				dest: yeoman.images + '/' + newDir
			});

			copyImages = {
				files: files
			};

			grunt.config.set('copy.images', copyImages);
		});

		grunt.task.run('copy:images');
	});

	grunt.config.set('copy', {
		deploy: {
			src: [],
			dest: 'public/'
		}
	});
};