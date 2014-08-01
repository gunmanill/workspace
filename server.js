
var http = require("http");
var fs = require('fs');



var index_page = fs.readFileSync('app/index.xml', 'utf8');
var main_js = fs.readFileSync('app/build/main.js', 'utf8');

var routes = require('./app/build/components/main__routes.js');
var map = new Function('return ' + fs.readFileSync('app/build/components/node_components_map.js', 'utf8'))();

function getDependencies(v_name, override) {
	var dep = {};
	getDep(v_name);

	function getDep(v_name) {


		var ind = map.names.indexOf(v_name);
		for(var i= 0, len=map.flags[ind].modules.length; i<len; i++) {
			var sub_view = map.names[map.flags[ind].modules[i]];
			if(!(sub_view in dep)) {
				dep[sub_view] = 1;
				getDep(sub_view);
			}
		}


		for(var c_name in map.flags[ind].controllers) {
			var c_view = map.names[map.flags[ind].controllers[c_name]];
			if(c_name in override)
				c_view = override[c_name];
			if(!(c_view in dep)) {
				dep[c_view] = 1;
				getDep(c_view);
		  }
		}
	}

	return dep;
}


http.createServer(function(request, response) {

	request.setEncoding('utf8');


	if(request.method == 'POST') {

		var postData = '';
		request.addListener('data', function(chunk) {
			postData += chunk;
		});

		request.addListener('end', function () {

			response.writeHead(200, { 'Content-Type' : 'text/plain' });

			var r = JSON.parse(postData);

			var ret = {};

			for(var i= 0, len= r.length; i<len; i++) {
				var list = [];
				if(r[i][0] == 'getComponents') {
					for(var kid= 0, klen=r[i][1].length; kid<klen; kid++)
						list[i] = nude_components[r[i][1][kid]];

					ret['getComponents'] = list;
				} else {
					ret[r[i][0] + '.' + r[i][1]] = model_methods[r[i][0]][r[i][1]](r[i][2]);
				}
			}


		});
	} else {
		response.write(index_page);
		response.write('\n<script>\n');
		response.write(main_js);

		var override;
		for(var key in routes) {
			if(routes[key].reg.test(request.url)) {
				override = routes[key].override;
				break;
			}
		}


		var comp_list = getDependencies('page:view', override);
		comp_list['page:view'] = 1;
		for(var key in comp_list) {
			response.write(wrapped_components[key]);
			var ind = map.names.indexOf(key);
			if(map.flags[ind].defaults) {
				response.write('async.appendToResponceData("' + map.flags[ind].defaults[0] + '.' + map.flags[ind].defaults[1] + '", ');
				response.write(JSON.stringify(model_methods[map.flags[ind].defaults[0]][map.flags[ind].defaults[1]](map.flags[ind].defaults[2])));
				response.write(');');
			}
		}
		response.write('\n<\/script>\n');
		response.end();
	}

}).listen(8888);

var model_methods = {
	'post-list:model' : {
		'getPosts' : function (options) {
			var data = fs.readFileSync('test-json/test.json', 'utf8');
			data = JSON.parse(data);
			var len = data["post-list"].length;
			var ret = {
				'post-list' : [],
				'totalCount' : len
			}
			for(var i=options.page; i<len && i<options['countPerPage']; i++)
				ret['post-list'].push(data["post-list"][i]);
			return ret;
		}
	},
	'Header:extra_model' : {
		'getExtraInfo' : function () {
			return JSON.parse(fs.readFileSync('test-json/extra.json', 'utf8'));
		}
	}
}

var wrapped_components = {};
var dir = 'app/build/components/wrapped/';
var files = fs.readdirSync(dir);
for(var i in files){
	if (!files.hasOwnProperty(i)) continue;
	var name = dir + files[i];
	if(fs.statSync(name).isDirectory())continue;
	wrapped_components[files[i].replace(/__/g, ':').replace(/\.js$/, '')] = fs.readFileSync(name, 'utf8');
}

var nude_components = {};
var dir = 'app/build/components/';
var files = fs.readdirSync(dir);
for(var i in files){
	if (!files.hasOwnProperty(i)) continue;
	var name = dir + files[i];
	if(fs.statSync(name).isDirectory())continue;
	nude_components[files[i].replace(/__/g, ':').replace(/\.js$/, '')] = fs.readFileSync(name, 'utf8');
}

