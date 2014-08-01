var path = require('path');
var fs = require('fs');
var _ = require('underscore');
var sprite = require('node-sprite');


module.exports = function (grunt) {


	grunt.config.set('sprites', {
		sourcePath: '<%=yeoman.app %>/build/static/images/sprites/',
		webPath: 'images/sprites/',
		stylPass: '<%=yeoman.dist %>/styl/sprite.styl'
	});

	grunt.registerTask('sprite', 'Simple sprite generation', function () {

		var basePath = path.resolve(grunt.config('sprites.sourcePath'));

		var done = this.async();

		sprite.sprites({ path: basePath }, function (err, result) {

			//console.log(result);

			if (!err) {

				_.each(result, function (pack, e) {


					var spriteStr = "// This file was generated automaticly, so don't modify it!\n";
					spriteStr += "." + pack.name + " {\n";
					spriteStr += '\tbackground-image: url("' + grunt.config('sprites.webPath') + pack.filename() + '");\n';
					spriteStr += '\tbackground-repeat: no-repeat;\n';
					spriteStr += '\tdisplay: inline-block;\n';
					spriteStr += "}\n";

					_.each(pack.images, function (file) {

						spriteStr += ".icon-sprite-" + file.name + "{";
						spriteStr += "\n";
						spriteStr += "\t@extend ." + pack.name + ";\n";
						spriteStr += "\twidth: " + file.width + "px;\n";
						spriteStr += "\theight: " + file.height + "px;\n";
						spriteStr += "\tbackground-position: " + (-file.positionX) + "px " + (-file.positionY) + "px;\n";
						//}
						spriteStr += "}\n";
					});

					fs.writeFile(path.resolve(grunt.config('sprites.stylPass.' + e)), spriteStr, function () {
						if (err) throw err;
						console.log('File ' + grunt.config('sprites.stylPass') + ' was updated');
						done(true);

						//grunt.task.run(['pngmin']);
					});
				});

			} else {
				console.error(err);
			}

		});

	})
};
