var gulp = require('gulp'); // Gulp JS
var stylus = require('gulp-stylus');
var myth = require('gulp-myth');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-cssmin');
var gutil = require('gulp-util');
var rename = require('gulp-rename');
var gzip = require('gulp-gzip');
var shell = require('gulp-shell');
var runSequence = require('run-sequence');
var concat = require('gulp-concat');
var nodemon = require('gulp-nodemon');


// node_tasks
var sprites = require('./gulp_tasks/gulp_sprite.js');
var math_random = require('./gulp_tasks/gulp_stylus_image.js');

//var pngquant = require('./tasks-gulp/pngquant.js');

var exec = require('child_process').exec;
var log = gutil.log;

var paths = {
	app: 'app',
	build: 'app/build',
	dist: 'app/src',
	imagesWebPath: 'images'
};




gulp.task('scripts', function () {

	return gulp
		.src([paths.dist + '/vendor/jquery-2.1.0.min.js', paths.dist + '/translation.js', paths.dist + '/vendor/async.js', paths.dist + '/vendor/require.js', paths.build + '/components/components_map.js'])
		.pipe(concat('main.js'))
		.pipe(gulp.dest(paths.build));
});


/*gulp.task('cssmin', function () {
	return gulp
		.src(paths.build + '/production.css')
		.pipe(cssmin())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest(paths.build+'/css'));
});*/

/*gulp.task('uglify', function () {
	return gulp
		.src(paths.build + '/js/production.js')
		.pipe(uglify())
		.pipe(gulp.dest(paths.build+'/js'))
});

gulp.task('uglify-lmd', function () {
	return gulp
		.src(paths.build + '/main.lmd-1.0.0.js')
		.pipe(uglify({

		}))
		.pipe(gulp.dest(paths.build))
});
*/

/*gulp.task('sprite', function (cb) {
	sprites({
		src: paths.app + '/images/sprites/',
		dest: paths.dist + '/styl/sprite.styl',
		done: cb
	});
});*/

gulp.task('sprite', shell.task([
	'grunt sprite'
]));


gulp.task('lmd_shell', shell.task([
	'node node_self_lmd.js'
]));

gulp.task('socket_server', shell.task([
	'node socket.js'
]));

gulp.task('lmd', function(cb) {

	setTimeout(function() {

		runSequence('lmd_shell', cb);
	}, 1000);
});

gulp.task('prepareImg', shell.task([
	'grunt prepareImg'
]));


gulp.task('startServer', function(cb) {
	nodemon({ script: 'server.js'}).on('restart', function () {
		console.log('server restarted!');
	});
	//runSequence('socket_server', cb);

});

gulp.task('def', function(cb) {
	runSequence('build', 'watch', 'startServer', cb);
});




/*var exec = require('child_process').exec;
 gulp.task('lmd', function (cb) {
 exec('node_modules/lmd/bin/lmd build app', {},
 function (error, stdout, stderr) {
 log(gutil.colors.red(stderr));
 console.log(stdout);
 cb();
 });
 });*/


// +++++++++++++++++++++++++++++++++
//           gulp-gzip
// +++++++++++++++++++++++++++++++++
/*gulp.task('gzip-js', function () {
	return gulp
		.src(paths.build + '/js/production.js')
		.pipe(gzip())
		.pipe(gulp.dest(paths.build+'/gzip'));
});
gulp.task('gzip-css', function () {
	return gulp
		.src(paths.build + '/css/production.min.css')
		.pipe(gzip())
		.pipe(gulp.dest(paths.build+'/gzip'));
});

*/

// +++++++++++++++++++++++++++++++++
//              STYLUS
// +++++++++++++++++++++++++++++++++

gulp.task('stylus', function () {


	gulp.src([paths.dist +'/components/**/*.styl', paths.dist +'/pages/**/*.styl', paths.dist +'/regions/**/*.styl'])
		.pipe(stylus({
			use: ['nib'],
			set: ['compress'],
			define: {
				'math-random': math_random
			}
		}))
		.on('error', console.log)
		.pipe(myth()) // добавляем префиксы - http://www.myth.io/
		.pipe(gulp.dest(paths.dist + '/styl/temp'));

	gulp
		.src(paths.dist + '/styl/base.styl')
		.pipe(stylus({
			use: ['nib'],
			set: ['compress'],
			define: {
				'math-random': math_random
			}
		}))
		.on('error', console.log)
		.pipe(myth()) // добавляем префиксы - http://www.myth.io/
		.pipe(concat('main.css'))
		.pipe(gulp.dest(paths.build + '/static'));
});


// +++++++++++++++++++++++++++++++++
//              STYLUS
// +++++++++++++++++++++++++++++++++

gulp.task('restartServer', function(cb) {
	console.log('restart');
	/*if(nodemon.emit)
		nodemon.emit('restart');*/
	cb();
})

/*  WATCH  */


gulp.task('watch', function () {
	gulp.watch(paths.dist + '/components/**/*.styl', function (callback) {
		runSequence('stylus', 'lmd', 'restartServer');
	});
	gulp.watch(paths.dist + '/pages/**/*.styl', function (callback) {
		runSequence('stylus', 'lmd', 'restartServer');
	});
	gulp.watch(paths.dist + '/regions/**/*.styl', function (callback) {
		runSequence('stylus', 'lmd', 'restartServer');
	});
	gulp.watch(paths.dist + '/styl/**/*.styl', ['stylus', 'restartServer']);

	gulp.watch(paths.dist + '/**/*.js', ['lmd', 'scripts', 'restartServer']);
	gulp.watch(paths.dist + '/**/*.xml', ['lmd', 'restartServer']);
});


gulp.task('default', ['def']);
gulp.task('gzip', ['gzip-js', 'gzip-css']);
gulp.task('build', function(cb) {
	runSequence('prepareImg', 'sprite', 'stylus', 'lmd', 'scripts', cb);
});




