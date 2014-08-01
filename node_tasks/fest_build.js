module.exports = function (grunt) {

	var path = require('path');
	var _ = require('underscore');
	var fs = require('fs');


	grunt.config.set('fest', {
		frontEnd: {
			src: '<%=yeoman.build %>',
			dist: '<%=yeoman.build %>'
		}
	});

	grunt.config.set('festProduction', {
		templates: {
			src: '<%=yeoman.build %>',
			dist: '<%=yeoman.build %>'
		}
	})


	grunt.config.set('fest-preprocessing', {
		process: {
			header: '<?xml version="1.0"?>\n<fest:template xmlns:fest="http://fest.mail.ru" context_name="context">',
			footer: '</fest:template>',
			src: '<%=yeoman.dist %>/**/*.xml',
			dist: '<%=yeoman.build %>/template.xml',
			pathWithOut: '<%=yeoman.app %>'
		}
	})

	grunt.registerMultiTask('fest-preprocessing', 'fest-preprocessing', function () {
		var that = this;
		var templateGet = '\t<fest:get select="context.block">context.params</fest:get>\n';

		// получаем все файлы
		// если это файл, то возвращаем его полный путь
		var output = grunt.file.expand({
			filter: function (filepath) {
				if (grunt.file.isFile(filepath)) {
					return filepath;
				}
			}
		}, this.data.src);

		var h = that.data.header + '\n';

		// проходим по массиву путей к файлам шаблонов
		output.forEach(function (itar) {
			var splitFile = itar.split('/');


			var without = _.without(splitFile, 'app', 'assets');
			h += '\t\t<fest:include context="context" src="../' + without.join('/') + '"/>\n';
			console.dir(itar);

		});
		h += templateGet;
		h += that.data.footer;

		grunt.file.write(this.data.dist, h);

	});


	grunt.registerMultiTask('fest-bem-preprocessing', 'fest-preprocessing', function () {
		var that = this;

		var templateGet = '\t<fest:get select="context.block">context.params</fest:get>\n';

		// получаем все файлы
		// если это файл, то возвращаем его полный путь
		var output = grunt.file.expand({
			filter: function (filepath) {
				if (grunt.file.isFile(filepath)) {
					return filepath;
				}
			}
		}, this.data.src);

		var h = that.data.header + '\n';

		// проходим по массиву путей к файлам шаблонов
		output.forEach(function (itar) {
			var splitFile = itar.split('/');


			var without = _.without(splitFile, 'app', 'assets');
			h += '\t\t<fest:include context="context" src="../../' + without.join('/') + '"/>\n';
			console.dir(itar);

		});
		h += templateGet;
		h += that.data.footer;

		grunt.file.write(this.data.dest, h);

	});


	grunt.registerMultiTask('fest', 'Build fest files', function () {

		var src = path.resolve(process.cwd(), this.data.src);
		var dist = path.resolve(process.cwd(), this.data.dist);
		var done = this.async();

		grunt.util.spawn({
			cmd: 'node_modules/.bin/fest-build',
			args: ['--dir=' + src, '--out=' + dist, '--compile.debug=true']
		}, function (error, result, code) {


			if (error) {
				console.log(error);
				grunt.log.error(result);
				done(false);
			} else {
				grunt.log.write(result.toString());
				done();
			}

		})
	});


	grunt.registerMultiTask('festProduction', 'Build fest files', function () {


		var src = path.resolve(process.cwd(), this.data.src);
		var dist = path.resolve(process.cwd(), this.data.dist);
		var done = this.async();

		grunt.util.spawn({
			cmd: 'node_modules/.bin/fest-build',
			args: ['--dir=' + src, '--out=' + dist]
		}, function (error, result, code) {


			if (error) {
				grunt.log.error(result);
				done(false);
			} else {
				grunt.log.write(result.toString());
				done();
			}

		})
	});


	/* компиляция клиентских шаблонов */
	grunt.registerTask('fest-develop', ['fest-preprocessing', 'fest:frontEnd']);
};
