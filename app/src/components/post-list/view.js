var app = require('main:app');
var Model = require('post-list:model');
var Post = require('post-list:post:view');

module.exports = app.View.extends({

	template : module.template,

	events: {

	},

	initialize : function (options) {
		this.model = new Model(options.model || {});
		this.super(options);
	},

	appendPosts : function (options) {
		var self = this;
		this.model.getPosts().done(function (data) {
			self.createPosts(data, options);
		});
	},

	render : function (options) {
		this.super(options);
		this.createPosts(this.model.attrs, options);
	},

	onScroll : function () {

		if (this.model.get('totalDownload') < this.model.get('totalCount')) {
			var pageYOffset = (window.pageYOffset + window.innerHeight) + 20;
			if(this._postList.coords.bottom == 0)
				this._postList.coords = app.utils.getCoords(this._postList.el);

			if (pageYOffset >= this._postList.coords.bottom)
				this.appendPosts({render : true});
		} else
			this.off(window, 'scroll', this.onScroll);
	},

	createPosts : function (posts, options) {
		var df = document.createDocumentFragment();
		var self = this;
		if (posts) {

			_.each(posts['post-list'], function (post) {
				var el = document.createElement('div');
				el.className = 'b-post__item';
				self._postList.objects.push(new Post(_.extend(options, {
					$el : $(el),
					model : post,
					controller : self.controller
				})));

				df.appendChild(el);
			});

			this._postList.el.appendChild(df);

			this._postList.coords = app.utils.getCoords(this._postList.el);
		}
	},

	beforeInsert : function ($el, options) {
		this.on(window, 'scroll', this.onScroll);

		this._postList = {
			el : $el[0].querySelector('.b-post-list__content'),
			coords : {
				bottom : 2000
			},
			objects : []
		};
	},

	dispose : function () {
		for(var i= 0, len=this._postList.objects.length; i<len; i++)
			this._postList.objects[i].dispose();

		this.super();
	}
});
