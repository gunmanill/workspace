require.define("post-list:model", function(require, module, exports) {var app = require('main:app');


module.exports = app.Model.extends({

	defaults : { //module.defaults
		'post-list' : [],
		page: 0,
		countPerPage : 10,
		totalDownload : 0,
		totalCount : 0,
		loading : false,
		defaults : module.defaults
	},

	name : module.name,

	initialize : function (options) {
		this.getPosts();
	},

	getPosts : function () {

		var def = $.Deferred();
		if(this.loading) {
			def.reject();
		} else {
			var params = {
				page : this.get('page'),
				countPerPage : this.get('countPerPage')
			};

			var self = this;
			this.loading = true;

			this.async('getPosts', params, function (data) {

				if(data['post-list']) {

					self.parse(data);
					self.loading = false;
					def.resolve(data);
				} else {
					def.reject();
				}
			});
		}
		return def.promise();
	},

	parse : function (data) {
		if (data) {

			this.set({
				'post-list' : this.get('post-list').concat(data['post-list']),
				totalDownload : this.get('totalDownload') + data['post-list'].length,
				page : this.get('page') + 1,
				totalCount : data['totalCount']
			});
		}
	}
});});