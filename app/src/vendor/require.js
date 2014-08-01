(function() {

	var comp_constructors = {},
		components = {},
		map,
		initRequested = false,
		head = document.getElementsByTagName('head')[0],
		main_app = 'main:app',
		async_list;

	var storage = {
		get : function (section, prop) {
			return localStorage[section + '_' + prop] || false;
		},

		set : function (section, prop, value) {

			localStorage[section + '_' + prop] = value;
		}
	};

	require = function(mname) {
		if(mname in components && components[mname].exports === undefined || !(mname in components))
			initComponent(mname);

		return components[mname].exports;
	}

	function initComponent(mname) {
		components[mname] = {
			name : mname,
			exports : undefined
		};

		if(comp_constructors[mname])
			comp_constructors[mname](require, components[mname], components[mname].exports);

		delete comp_constructors[mname];
		return components[mname].exports;
	}

	function initComponents() {
		var ret = {};

		if(main_app in comp_constructors) {
			initComponent(main_app);
			delete comp_constructors[main_app];
		}

		for(var mname in comp_constructors)
			ret[mname] = initComponent(mname);

		comp_constructors = {};
		initRequested = false;

		return ret;
	}

	require.define = function(mname, constructor) {

		storage.set('modules', mname, constructor.toString());
		comp_constructors[mname] = constructor;

		if(!initRequested) {
			setTimeout(initComponents, 0);
			initRequested = true;
		}
	}

	require.initMap = function (data) {
		map = data;
	}

	require.addCss = function (cssText) {

		var style = document.createElement('style');
		style.type = 'text/css';

		if(style.styleSheet)
			style.styleSheet.cssText = cssText;
		else
			style.appendChild(document.createTextNode(cssText));

		head.appendChild(style);
	}

	require.async = function(arr, override, callback) {

		if(typeof arr != 'object')
			arr = [arr];
		async_list = {};
		var ret = {};
		var tmp;
		for(var i= 0, len=arr.length; i<len; i++) {
			var v_name = arr[i];
			if(components[v_name]) {
				ret[v_name] = components[v_name];
			} else if((tmp = storage.get('modules', v_name))) {

				var module = {
					name : v_name
				};

				new Function('return ' + m_export)(require, module);
				components[v_name] = module.exports;
				ret[v_name] = module.exports;
			} else {
				if(!(v_name in async_list)) {
					async_list[v_name] = 1;
					getDependencies(v_name, override);
				}
			}
		}

		var comp_list = [];
		var defaults_list = [];
		for(var v_name in async_list) {
			comp_list.push(v_name);
			var def = map.flags[map.names.indexOf(v_name)].defaults;
			if(def)
				defaults_list.push(def);
		}

		if(defaults_list.length > 0) {
			var clb = comp_list.length > 0 ? undefined : callback;
			for(var i= 0, len=defaults_list.length; i<len; i++)
				async(defaults_list[i], 0, clb);
		}

		if(comp_list.length > 0)
			async(['getComponents', comp_list], 0, function(data) {
				var json = data;
				for(var i= 0, len=json.length; i<len; i++)
					json[i]();  //define
				var inited = initComponents();
				for(var key in inited)
					ret[key] = inited[key];
				callback(ret);
			});
		else if(defaults_list.length == 0)
			callback(ret);
	}

	function getDependencies(v_name, override) {
		var ind = map.names.indexOf(v_name);
		for(var i= 0, len=map.flags[ind].modules.length; i<len; i++) {
			var sub_view = map.names[map.flags[ind].modules[i]];
			if(!(sub_view in components) && !(sub_view in async_list)) {
				async_list[sub_view] = 1;
				getDependencies(sub_view, override);
			}
		}
		for(var c_name in map.flags[ind].controllers) {
			var c_view = map.names[map.flags[ind].controllers[c_name]];
			if(c_name in override)
				c_view = override[c_name];
			if(!(c_view in async_list)) {
				async_list[c_view] = 1;
				getDependencies(c_view, override);
			}
		}
	}
})();
