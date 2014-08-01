module.template = function anonymous(it) {
var out='';if(it.fade){out+='<div class="b-post__item-fade"></div>';}out+='<div class="b-post__item-img" style="background: url('+(it.img.path)+') no-repeat 0 0;background-size:'+(it.img.width)+'px '+(it.img.height)+'px"></div><div class="b-post__item__body"><div class="b-post__item__body-desc">'+(it.description)+'</div><div class="b-post__item__body-uniq"><ul class="b-post__item__result">'; for(var i in it.list) { out+='<li class="b-post__item__result-item"><span class="b-post__item__result-item-bg" style="width:'+(it.list[i].count)+'%"></span><span class="b-post__item__result-count b-inline-block">'+(it.list[i].count)+'</span><span class="b-post__item__result-text b-inline-block">'+(it.list[i].text)+'</span></li>'; } out+='</ul></div></div><div class="b-post__item-footer"><div class="b-post__item__author" data-author-id="'+(it.author.id)+'"><span class="b-post__item__author-pic b-inline-block"><img src="'+(it.author.user_pic)+'" alt="'+(it.author.name)+'"/></span><span class="b-post__item__author-name b-inline-block"><span class="b-block">'+(it.author.name)+'</span><span class="b-block">'+(it.author.last_name)+'</span></span><div class="b-post__item__pots-time">'+(it.time)+'</div></div></div>';return out;
};require.addCss(function anonymous(it) {
var out='.b-post__item { display: inline-block; width: 211px; height: 282px; overflow: hidden; margin: 3px 5px 3px 5px; padding: 10px; position: relative;}.b-post__item:last-child { margin-right: 0;}.b-post__item-fade { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: #333; opacity: .4; z-index: 1;}.b-post__item-img { position: absolute; top: 0; right: 0; bottom: 0; left: 0;}.b-post__item__author { font-size: 12px; font-weight: bold; color: #fff; font-family: Helvetica Neue,arial,sans-serif;}.b-post__item__author-pic { width: 42px; height: 42px; vertical-align: middle;}.b-post__item__author-name { vertical-align: middle; padding-left: 11px;}.b-post__item__body { position: relative; color: #fff; z-index: 1;}.b-post__item__body-uniq { margin-top: 13px; overflow: hidden;}.b-post__item-footer { position: absolute; bottom: 0; left: 0; right: 0; padding: 10px; z-index: 1;}.b-post__item__pots-time { position: absolute; right: 10px; bottom: 20px;}.b-post__item__result { margin: 0 0 0 -10px; padding: 0;}.b-post__item__result-item { margin-bottom: 3px; padding-left: 18px; position: relative;}.b-post__item__result-item-bg { position: absolute; left: 0; bottom: 0; top: 0; background: #e0e0e0; opacity: .6; z-index: 2;}.b-post__item__result-count,.b-post__item__result-text { vertical-align: middle; position: relative; z-index: 2;}.b-post__item__result-count { padding-right: 15px; color: #333;}.b-post__item__result-text { color: #fff;}';return out;
}());var app = require('main:app');
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