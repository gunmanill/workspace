var app = require('main:app');
var Model = require('filter:model');

module.exports = app.View.extends({

	componentName: 'filter',
	templateName: 'index',
	className: 'b-filter',

	initialize : function(options){
		this.model = new Model(options);
		app.super(this, 'initialize', options);

		this._collectionNode = {}
	},

	events : {
		//'click .js-filter_node' : 'addNodeFilter',
		//'click .js-delete_filter_node' : 'removeNodeFilter'
	},

	modelChanged: function (data) {
		console.log(data);
	},

	getNode : function(node){
		return this._collectionNode[node.id];
	},

	addNodeFilter : function(node){
		this._collectionNode[node.id] = node;
	},

	removeNodeFilter : function(node){
		delete this._collectionNode[node];
	},

	getContentElement : function(){
		return this.el;
	},

	dispose : function(){
		app.super(this, 'dispose');
	}

});
