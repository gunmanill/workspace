var app = require('main:app'),
		Model = require('page:model');

module.exports = app.View.extends({

	template : module.template,

	events: {

	},

	initialize : function (options) {
		this.model = new Model();
		this.super(options);
	}

});
