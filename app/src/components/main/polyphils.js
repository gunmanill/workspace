Function.prototype.bind = function(cont) {
	if(typeof this != 'function') {
		console.log('Function binding failed');
		return;
	}
	var func = this;

	return function() {
		return func.apply({cont : this, self : cont}, arguments);
	};
};

_ = {
	each : function(obj, iterator, context) {
		for(var key in obj)
			iterator.call(context, obj[key], key, obj);
	},
	extend : function (obj) {

		for(var i= 1, len=arguments.length; i<len; i++) {
			var source = arguments[i];
			for(var key in source)
				obj[key] = source[key];
		}
		return obj;
	},

	isEmpty : function(obj) {
		if (obj == null) return true;
		if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;
		for (var key in obj) if (obj.hasOwnProperty(key)) return false;
		return true;
	},

	clone : function(obj) {
		if (typeof obj != 'object') return obj;
		return obj instanceof Array ? obj.slice() : _.extend({}, obj);
	},

	isArray : function(obj) {
		return obj instanceof Array;
	},

	isString : function(obj) {
		return typeof obj === 'string';
	}

};

(function () {

	var initializing = false;
	Class = function () {};

	Class.extends = function (child) {

		initializing = true;
		var new_prototype = new this(),
			parent = this.prototype;
		initializing = false;

		for(var key in child) {
			new_prototype[key] = child[key];
			if(typeof child[key] === 'function')
				new_prototype[key].super = typeof parent[key] === 'function' ? parent[key] : function () {console.log('no super method in parent')};

		}


		var newClass = function() {
			if(!initializing) {
				for(var key in this)
					if(typeof this[key] === 'function') {
						this[key] = (function(self, func) {
							var ret = function() {
								var prev_super = self.super;

								self.super = func.super;
								var ret = func.apply(self, arguments);
								self.super = prev_super;
								return ret;
							};
							ret.super = func.super;

							return ret;
						})(this, this[key]);
					}

				if(this.init)
					this.init.apply(this, arguments);
			}
		};
		newClass.prototype = new_prototype;
		newClass.prototype.constructor = newClass;
		newClass.extends = arguments.callee;

		return newClass;
	}
})();


