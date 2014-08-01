module.exports = function (grunt) {

	var path = require('path');
	var fs = require('fs');
	var _ = require('underscore');


	grunt.config.set('pngmin', {
		compile: {
			options: {
				binary: '/usr/local/bin/pngquant', // pngquant path if on Linux
				concurrency: 1, // how many exucutables get spawned in parallel
				colors: 256, // reduce colors to 256
				ext: '.png', // use .png as extension for the optimized files
				quality: '80-90', // output quality should be between 75 and 80 like jpeg quality
				force: true, // Should existing files be overwritten by the optimized version?
				speed: 1, // slowest (1-10)
				iebug: false, // optimize image for use in Internet Explorer 6
				transbug: false // transparent color will be placed at the end of the palette.
			},
			files: [
				{
					src: 'app/images/**/*.png',
					dest: 'app/images/**/*.png'
				}
			]
		}

	});
};