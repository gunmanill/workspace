var path = require('path');
var fs = require('fs');
var _ = require('underscore');

module.exports = function (grunt) {

	grunt.registerTask('nodeGit', '', function () {
		var yeoman = grunt.config.get('yeoman');
		var done = this.async();

		grunt.util.spawn({
			cmd: 'git',
			args: ['log', '-1', '--pretty=format:%h']
		}, function (error, result, code) {

			if (error) {
				grunt.log.error(result);
				done();
			} else {

				//grunt.log.write(result.toString());
				grunt.option('get_git', result.toString());


				var dataVersion = {};
				dataVersion.version = result.toString();
				grunt.file.write(yeoman.app + '/.lmd/version.json', JSON.stringify(dataVersion));


				grunt.task.run(['createVersion']);

				done();
			}

		})
	});
}
