require.define("error-manager:view", function(require, module, exports) {var app = require('main:app');
var Model = require('error-manager:model');
var CurrentUser = require('user:view');


var ErrorManager = app.View.extends({

	componentName: 'error-manager',

	className: 'error-manager modal-popup',

	initialize: function (options) {
		this.model = new Model(options);
		app.super(this, 'initialize', options);
	},

	events: {
		'click .btn-close': function () {
			this.$el.detach();
		},
		'click .err__btn-reload': function () {
			location.href = location.href;
		}
	},


	setSingleError: function (err) {
		if (err) {
			this.set({ message: this.model.get('customError')[err] || err }, { silent: true });
			this.render();
		}
	},

	setError: function (type, err, opt_el) {

		if (!_.isUndefined(type) && !_.isUndefined(this.model.get(type)[err])) {
			var typeErr = this.model.get(type);
			var err = typeErr[err];


			if (opt_el) {
				opt_el.html(err + "");
				opt_el.css({
					'opacity': 1,
					'visibility': 'visible'
				});
				setTimeout(function () {
					opt_el.animate({
						'opacity': 0
					}, 500, function () {
						opt_el.removeAttr('style');
					});
				}, 3000);
			} else {
				this.set({ message: err}, { silent: true });
				this.render();
			}
			return err;
		}
	},

	getErrors: function () {
		var def = $.Deferred();

		$.ajax({
			url: app.serverApi.errors,
			dataType: 'JSON',
			type: 'POST',
			success: function (data) {
				if (data.site_error) {
					this.set(data);
					def.resolve();
				} else {
					def.reject();
				}
			}.bind(this)
		});

		return def.promise();
	},


	reportError: function (error) {

	},


	render: function () {
		this.$el.html(app.templ(this.template, this.toJSON()));
		$('body').append(this.$el);
		return this;
	}

}, {
	getInstance: function () {

		if (!this._instance) {
			this._instance = new this();
		}
		return this._instance;
	}
});


module.exports = ErrorManager.getInstance();
});