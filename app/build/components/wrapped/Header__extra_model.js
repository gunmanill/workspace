require.define("Header:extra_model", function(require, module, exports) {var app = require('main:app');

module.exports = app.Model.extends({

	defaults : {
		active_menu : 'feed'
	},

	name : module.name,


	initialize : function (options) {
		this.getExtraInfo();
	},

	getExtraInfo : function () {
		var def = $.Deferred();
		var self = this;
		this.async('getExtraInfo', {}, function(data) {
			self.set(data)
			def.resolve(data);
		});
		return def.promise();
	}
});});