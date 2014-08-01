require.define("search:view", function(require, module, exports) {var app = require('main:app');
var Model = require('search:model');
//var PostList = require('post-list:view');

module.exports = app.View.extends({

	componentName: 'search',
	templateName: 'index',
	className: 'b-search',

	initialize : function(options){
		this.model = new Model(options);
		app.super(this, 'initialize', options);

		if(_.isUndefined(this.model.get('mini'))){
			this.getDataSearch();
		}
	},

	events : {
		'submit .b-search__form' : 'goToSearchPage'
	},

	createDom : function(){
		if(!_.isUndefined(this.model.get('mini'))){
			this.$el.addClass('b-search_mini');
			this.templateName = 'mini';
		}
	},

	modelChanged: function (data) {
		console.log(data);
	},

	getDataSearch : function(){
		/*this._postList = new PostList({
			elem : this.$el
		});*/
	},

	getSearchRequest : function(){
		return $.trim(this._field_search.val());
	},

	goToSearchPage : function(evt){
		evt.preventDefault();
		evt.stopPropagation();

		var $this = $(evt.currentTarget);

		var searchR = this.getSearchRequest();

		if(searchR != '' && searchR.length >= 5) {
			app.trigger('navigate:to', 'search/' + encodeURIComponent(searchR));
		}
	},

	enterDocument : function(){
		this._field_search = this.$el.find('.js-field-search');
	},

	dispose : function(){
		app.super(this, 'dispose');
	}

});
});