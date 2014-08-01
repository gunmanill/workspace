module.exports = function (grunt) {

  'use strict';

	var path = require('path');
	var fs = require('fs');
	var sys = require('sys');
	var _ = require('underscore');

	try{
		grunt.file.readJSON('node_tasks/USER.json')
	} catch (e){
		grunt.file.write('node_tasks/USER.json', JSON.stringify({ sandbox : '' }));
	}

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-lmd');
	grunt.loadNpmTasks('grunt-webfont');
	grunt.loadNpmTasks('grunt-pngmin');
	grunt.loadNpmTasks('grunt-shell');



  grunt.initConfig({

	  // configurable paths
    yeoman: {
      app: 'app',
      build: '<%=yeoman.app %>/build',
      dist: '<%=yeoman.app %>/src',
	    images: '<%=yeoman.app %>/build/static/images',
	    imagesWebPath: '<%=yeoman.app %> /static/images'
    },


    replace: {
      timestamp_replace: {
        src: ['app/ttx/index.tx'],
        overwrite: true, // overwrite matched source files
        replacements: [
          {
            from: '@@timestamp',
            to: "<%= new Date().getTime() %>"
          }
        ]
      }
    },

    compress: {
      main: {
        options: {
          mode: 'gzip'
        },
        files: [
          {
            expand: true,
            src: ['<%=yeoman.build %>/production.js'],
            dest: './',
            ext: '.js.gz'
          },
          {
            expand: true,
            src: ['<%=yeoman.build %>/css/production.css'],
            dest: './',
            ext: '.css.gz'
          }
        ]
      }
    },

	  /**
	   * команды консоли
	   * синхронизация измененных файлов с сервером
	   * или локально подключенной папкой с проектом
	   */
	  shell: {
		  rsync: {
			  options: {
				  stdout: true,
				  stderr: true
			  },
			  command: [
				  //--delete
					  "rsync -czavPK --delete " +
					  "--exclude='" + __dirname + "/target' " +
					  "--exclude='" + __dirname + "/public' " +
					  "--exclude='" + __dirname + "/.git' " +
					  "'-e ssh '  " + __dirname + "/* " + grunt.file.readJSON('node_tasks/USER.json').sandbox
			  ].join('&&')
		  }
	  }
  });


	grunt.loadTasks(__dirname + '/node_tasks');

	grunt.registerTask('default', ['watch']);

  /* полная сборка front-end */
  grunt.registerTask('build-develop', [
    'fest-preprocessing',
    'fest',
    'concat:component_styl',
    'concat:regions_styl',
    'concat:page_styl',
	  'sprite',
    'stylus',
    'lmd'
  ]);

  /* сборка front-end для production */
  grunt.registerTask('build-project', [
    'fest-preprocessing',
    'festProduction',
    'lmd',
    'concat:prod',
    'concat:component_styl',
    'concat:regions_styl',
    'concat:page_styl',
    'stylus',
    'uglify',
    'cssmin'
  ]);
};
