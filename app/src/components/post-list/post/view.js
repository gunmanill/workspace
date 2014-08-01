var app = require('main:app');
var Model = require('post-list:post:model');

module.exports = app.View.extends({

	template : module.template,

	events : {

	},

	initialize : function(options) {
		this.model = new Model(options.model);
		this.super(options);
	}

});