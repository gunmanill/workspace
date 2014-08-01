module.exports = function (grunt) {

	var path = require('path');
	var fs = require('fs');
	var _ = require('underscore');


	grunt.config.set('watch', {

		/* отслеживаем клиентские шаблоны */
		fest: {
			files: '<%=yeoman.dist %>/**/*.xml',
			tasks: 'fest-develop'
		},

		/* ---------------------
		 *   STYLUS
		 * ---------------------
		 */
		component_styl: {
			files: ['<%=yeoman.dist %>/components/**/*.styl'],
			tasks: ['concat:component_styl']
		},
		layout_styl: {
			files: ['<%=yeoman.dist %>/regions/**/*.styl'],
			tasks: ['concat:regions_styl']
		},
		page_styl: {
			files: ['<%=yeoman.dist %>/pages/**/*.styl'],
			tasks: ['concat:page_styl']
		},
		forms_styl: {
			files: ['<%=yeoman.dist %>/forms/css/*.styl'],
			tasks: ['concat:forms_styl']
		},
		stylus: {
			files: ['<%=yeoman.dist %>/styl/**/*.styl'],
			tasks: ['stylus']
		},
		/* ---------------------
		 *  /// STYLUS
		 * ---------------------
		 */


		lmd: {
			files: ['<%=yeoman.dist %>/**/*.js'],
			tasks: 'lmd'
		}
	});


	/*grunt.event.on('watch', function (action, filepath, target) {
	 grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
	 console.log('test');
	 });*/

};