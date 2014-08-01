require.define("main:router", function(require, module, exports) {
var app = require('main:app');


module.exports = {

	routes : require('main:routes'),

	index : function (params) {
		app.render({});
	},

	search : function (params) {

	},

	parseUrl : function (url) {

		for(var page in this.routes)
			if(this.routes[page].reg.test(url)) {
				this[page](this.routes[page].reg.exec(url));
				//app.trigger('route:' + page, params);
				return;
			}

	},

	navigate : function(url) {
		try {
			history.pushState(false, document.title, url);
		} catch(e) {}

		this.parseUrl(url);
	},

	start : function () {
		window.addEventListener('popstate', this.parseUrl, false);
		this.parseUrl(document.location.pathname);
	}
}});