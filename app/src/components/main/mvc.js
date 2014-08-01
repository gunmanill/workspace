
var Events = require('main:events');
//var Events = Class;
module.exports = function(app) {

	app.Controller = Class.extends({

		init : function(options) {
			this.name = options.name;

			this.$el = options.$el || $(options.el);
			this.cid = app.allocId();
			this.parent = options.parent;
			//this.parent.children[this.name] = this;
			this.children = {};

			this.view = require(options.view);

			this.view = new this.view(_.extend(options, {
				el : this.$el,
				name : options.view,
				controller : this,
				model : options.override && this.name in options.override ? options.override[this.name].params : undefined
			}));
		},

		initControllers : function($el, options) {

			var self = this;
			$el.find('.controller').each(function() {
				$this = $(this);
				var v_name = $this.data('view'),
					c_name = $this.attr('name');

				if(options.override && c_name in options.override)
					v_name = options.override[c_name].view;


				self.children[c_name] = new app.Controller(_.extend(options, {
					$el : $this,
					name : c_name,
					view : v_name,
					parent : self
				}));

			});
		},

		reRender : function(override) {
			if(this.name in override) {

				if(this.view.name != override[this.name].view) {
					_.each(this.children, function(ctrl) {
						ctrl.dispose();
					});
					this.view.dispose();
					this.view = require(override[this.name].view);
					this.view = new this.view({
						el : this.$el,
						controller : this,
						render : true,
						model : override[this.name].params
					});
				} else {
					this.view.model.set(override[this.name].params);
				}
			} else {
				_.each(this.children, function (ctrl) {
					ctrl.reRender(override);
				});
			}
		},

		dispose : function() {
			for(var key in this.children)
				this.children[key].dispose();

			this.view.dispose();
			if(this.parent)
				delete this.parent.children[this.name];

			for(var key in this)
				this[key] = undefined;
		}
	});


	var delegateEventSplitter = /^(\S+)\s*(.*)$/;



	app.View = Events.extends({

		viewEvents : [],

		events : {},

		initialize : function (options) {

			if (this.model) {
				this.model.c_id = this.controller ? this.controller.cid : 0;
				if(options.model)
					this.model.set(options.model);

			}

			this.render(options);
		},

		init : function (options) {
			options = options || {};
			this.$el = options.$el || $(options.el);
			this.cid = app.allocId();

			this.controller = options.controller;

			for(var key in this.events) {
				var method = this.events[key];
				if(typeof method != 'function')
					method = this[method];
				var match = delegateEventSplitter.exec(key);
				var eventName = match[1], selector = match[2];
				if (selector === '')
					this.$el.on(eventName, method);
				else
					this.$el.on(eventName, selector, method);

			}

			this.initialize(options);
		},

		modelChanged: function (data) {

		},


		enterDocument : function () {

		},

		beforeInsert : function ($el, options) {
			this.controller.initControllers($el, options);
		},

		clearEl : function () {
			this.$el.html('');
		},

		render : function (options) {

			if(options.render && this.template) {
				var $div = $(document.createElement('div'));
				var data = this.model.toJSON();
				$div.html(this.template(data));
			}

			if(this.template)
				this.beforeInsert($div, options);

			if(options.render && this.template) {
				var $df = $(document.createDocumentFragment());
				$df.append($div.children());
				this.$el.append($df);
			}

			return this;
		},

		on : function (selector, eventName, callback) {

			var handler;
			if(arguments.length == 2) {
				callback = eventName;
				eventName = selector;
				selector = undefined;
				handler = app;
			} else {
				handler = $(selector);
			}

			var toInsert = [selector, eventName, callback];
			if(this.viewEvents.indexOf(toInsert) == -1) {
				this.viewEvents.push(toInsert);
				handler.on(eventName, callback);
			}
		},

		off : function (selector, eventName, callback) {
			var handler, ind;
			if(arguments.length == 2) {

				callback = eventName;
				eventName = selector;
				selector = undefined;
				handler = app;
			} else {
				handler = $(selector);
				selector = handler;
			}

			var toInsert = [selector, eventName, callback];

			if((ind = this.viewEvents.indexOf(toInsert)) >= 0) {
				this.viewEvents.splice(ind, 1);
				handler.off(eventName, callback);
			}
		},

		dispose: function () {

			this.model.clear();

			for(var i= 0, len=this.viewEvents.length; i<len; i++) {
				var item = this.viewEvents[i];
				if(item[0] === undefined)
					app.off(item[1], item[2]);
				else
					item[0].off(item[1], item[2]);
			}

			this.remove();

			for(var key in this)
					this.key = undefined;
		}
	});

	app.Model = Events.extends({



		initialize : function (options) {
		},

		init : function (options) {

			this.attrs = {
				defaults : {}
			};

			if(options && 'c_id' in options)
				this.c_id = options.c_id;


			if(this.defaults)
				this.set(this.defaults)

			this.initialize(options);
		},

		set : function(key, val) {

			var attrs;

			if (typeof key === 'object')
				attrs = key;
			else
				(attrs = {})[key] = val;

			for(var key in attrs)
				this.attrs[key] = attrs[key];

		},

		get : function(key) {
			return key in this.attrs ? this.attrs[key] : undefined;
		},

		async : function (method, params, callback) {
			app.async([this.name, method, params], this.c_id, callback);
		},

		clear : function() {
			delete this.attrs;
			this.attrs = {};
		},

		toJSON : function() {
			return _.clone(this.attrs);
		}
	});
}
