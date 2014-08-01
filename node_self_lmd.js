// Загрузка модуля fs (файловая система)
var fs = require('fs');
var doT = require('dot');

var build_dir = 'app/build/';

var dependencies = {};  //module name -> [id1, id2, id3];

var root_dir;

function getFiles(dir) {
	var files = fs.readdirSync(dir);
	for(var i in files){
		if (!files.hasOwnProperty(i)) continue;
		var name = dir+'/'+files[i];
		if (fs.statSync(name).isDirectory()){
			getFiles(name);
		}else{
			parseDependencies(name, dir)
		}
	}
}

log = console.log;

req = (function() {

	var components = {},
		module,
		path = 'app/src/components/';

	function initComponent(mname) {
		components[mname] = module = {
			name : mname,
			exports : undefined,
			template : ''
		};


		new Function('require, module, exports, async', fs.readFileSync(path + mname.replace(/\:/g, '/') + '.js', 'utf-8')) (req, module, module.exports, async);

		module = {};
	}

	return function(mname) {



		if(mname in components && components[mname].exports === undefined || !(mname in components)) {
			initComponent(mname);
		}


		return components[mname].exports;
	}
})();

$= {};

$.Deferred = function () {
	return {
		promise : function () {
			var self = this;
			return {
				done : function (callback) {

					if(self.data)
						self.callback(self.data);
					else
						self.callback = callback;
				}
			};
		},
		resolve : function (data) {

			if(this.callback)
				this.callback(data);
			else
				this.data = data;
		},
		reject : function () {}
	};
}


var defaults;

var async = function (query, m_id, callback) {
	defaults = query;
	throw 1;
}

window = this;

app = req('main:app');




function parseDependencies(file, dir) {
	var text;
	if(/\.js$/.test(file)) {

		text = fs.readFileSync(file, 'utf8');
		var mname, fname, write_name, wrapped_name;

		file.replace(/\/([^\/]+).js$/, function(str, js) {
			fname = js;
		});

		mname = file.replace(new RegExp(root_dir + '\/?'), '').replace(/\//g, ':').replace(/\.js$/, '');

		write_name = build_dir + 'components/' + mname.replace(/:/g, '__') + '.js';
		wrapped_name =  build_dir + 'components/wrapped/' + mname.replace(/:/g, '__') + '.js';
		var out,
			tplt = '',
			css = '';


		defaults = undefined;

		try {
			var m = req(mname);
			if(typeof m === 'function')
				new m();
		} catch (e) {
			log(mname)
			log(e)
		}

		if(!(mname in dependencies))
			dependencies[mname] = {
				modules : {},
				controllers : {},
				defaults : defaults
			};

		defaults = undefined;

		text.replace(/require\((?:'|")([^)]+)(?:'|")\)/g, function(str, sub_module) {
			dependencies[mname].modules[sub_module] = 1;
		});

		if(text.indexOf('module.template') != -1) {

			var tpl_name = dir + '/templ/' + fname + '.xml';

			//check for template for component
			if (fs.existsSync(tpl_name)) {
				var tpl = fs.readFileSync(tpl_name, 'utf8');

				tpl.replace(/<([^>]+class\s*=\s*"[^"]*\bcontroller\b[^"]*"[^>]*)>/ig, function(str) {
					var v_name, c_name;
					str.replace(/data-view\s*=\s*"([^"]+)"/, function(str, sub_module) {
						v_name = sub_module;
					});

					str.replace(/name\s*=\s*"([^"]+)"/, function(str, controller) {
						c_name = controller;
					});



					dependencies[mname].controllers[c_name] = v_name;
				});
				tplt = 'module.template = ' + doT.template(tpl) + ';';
			}

			var styl_dir = file.replace(new RegExp(root_dir + '\/?'), 'app/src/styl/temp/').replace(/\/([\w\-]+).js/, '/css/$1.css');

			if (fs.existsSync(styl_dir)) {
				var tpl = fs.readFileSync(styl_dir, 'utf8');
				css = 'require.addCss(' + doT.template(tpl) + '());';
			} else console.log(styl_dir);
		}


		out = 'require.define("' + mname + '", function(require, module, exports) {' + tplt + css + text + '});';


		var data = new Buffer(out, 'utf8');
		var fd = fs.openSync(wrapped_name, 'w+');
		fs.writeSync(fd, data, 0, data.length, 0);

		out = tplt + css + text;
		data = new Buffer(out, 'utf8');
		fd = fs.openSync(write_name, 'w+');
		fs.writeSync(fd, data, 0, data.length, 0);
	}
}


root_dir = 'app/src/components';
getFiles(root_dir);


var map = {
	names : [],
	flags : []
};
for(var component in dependencies) {
	map.names.push(component);
}

for(var i=0; i<map.names.length; i++) {

	map.flags[i] = {
		modules : [],
		controllers : {},
		defaults : dependencies[map.names[i]].defaults
	};
	for(var sub_component in dependencies[map.names[i]].modules) {
		map.flags[i].modules.push(map.names.indexOf(sub_component));
		if(map.names.indexOf(sub_component) == -1)console.log('ERROR, cant find module ' + sub_component + ' for ' + map.names[i]);
	}
	for(var c_name in dependencies[map.names[i]].controllers) {

		map.flags[i].controllers[c_name] = map.names.indexOf(dependencies[map.names[i]].controllers[c_name]);
		if(map.names.indexOf(dependencies[map.names[i]].controllers[c_name]) == -1)console.log('ERROR, cant find module ' + dependencies[map.names[i]].controllers[c_name] + ' for controller ' + c_name + ' in ' + map.names[i]);
	}
}



var data = new Buffer('require.initMap(' + JSON.stringify(map) + ');', 'utf8');
var fd = fs.openSync(build_dir + 'components/components_map.js', 'w+');
fs.writeSync(fd, data, 0, data.length, 0);

data = new Buffer(JSON.stringify(map), 'utf8');
var fd = fs.openSync(build_dir + 'components/node_components_map.js', 'w+');
fs.writeSync(fd, data, 0, data.length, 0);