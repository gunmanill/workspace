require.define("page:view", function(require, module, exports) {module.template = function anonymous(it) {
var out='<div class="main"><header class="b-header controller" name="Header" data-view="Header:header"></header><div class="b-filter" name="Filter" data-view=""></div><div class="b-content controller" name="Content" data-view="post-list:view"></div><footer class="b-footer"></footer></div>';return out;
};require.addCss(function anonymous(it) {
var out='.b-content { padding: 20px 27px 0 27px;}';return out;
}());var app = require('main:app'),
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
});