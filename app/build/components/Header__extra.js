module.template = function anonymous(it) {
var out='<div class="b-extra"><div class="b-blur_wrapper"><div class="b-blur"></div></div><div class="b-extra-content"><div class="b-extra-content-wrapper"><div class="b-extra__search"><input class="b-extra__search-field" type="text" value="'+(app.i18n('Header:extra', 'search_in_veevavoo'))+'"/><div class="icon-sprite-search2"></div></div><div class="b-extra__profile"><div class="b-extra__profile__img" style="background: url('+(it.profile.user_pic)+') no-repeat 0 0;"></div><div class="b-extra__profile__name">'+(it.profile.name)+'</div><div class="b-extra__profile__name">'+(it.profile.firstName)+'</div><div class="b-extra__profile__settings">'+(app.i18n('Header:extra', 'settings'))+'</div></div><div class="b-extra-b-menu">'; var last; for(var key in it.counters)last = key;for(var key in it.counters) { out+='<div class="b-extra-b-menu__item ';if(it.active_menu == key){out+=' b-extra-b-menu__menu-item_active';}out+=' ';if(key == last){out+=' b-extra-b-menu__item_no-border';}out+='"><div class="icon-sprite-'+(key)+' b-extra-b-menu__img"></div><div class="b-extra-b-menu__menu-item"><span class="b-extra-b-menu__menu-item__text" data-key="'+(key)+'">'+(app.i18n('Header:extra', key))+'</span>';if(it.counters[key] > 0){out+='<span class="b-extra-b-menu__menu-item__counter">'+(it.counters[key])+'</span>';}out+='</div></div>'; } out+='</div><div class="b-extra__my-hub">'+(app.i18n('Header:extra', 'my_hub'))+'</div>'; for(var i=0; i<100;i++) { out+='<input style="visibility:hidden"/><br/>';}out+='</div></div></div>';return out;
};require.addCss(function anonymous(it) {
var out='.b-extra { width: 266px; height: 1275px; position: relative; overflow: hidden;}.b-extra .icon-sprite-search2 { position: absolute; right: 0; top: 0; cursor: pointer;}.b-extra .icon-sprite-search2:hover { -webkit-transform: scale(1.2); -ms-transform: scale(1.2); transform: scale(1.2); -webkit-transition: -webkit-transform .5s ease; transition: transform .5s ease;}.b-extra__search { position: relative; margin: 10px 30px; border-bottom: 1px solid rgba(250,250,250,0.3);}.b-extra__search-field { background: transparent; border: 0; color: rgba(250,250,250,0.9);}.b-extra__profile { margin: 10px 30px;}.b-extra__profile__img { float: left; border-radius: 25px; border: 3px solid rgba(255,255,255,0.7); width: 50px; height: 50px; margin-right: 10px;}.b-extra__profile__img:hover { border-color: #fff; -webkit-transition: border-color .5s ease; transition: border-color .5s ease;}.b-extra__profile__name { line-height: 16px; font-family: Helvetica Neue,arial,sans-serif; font-size: 15px; font-weight: bold; color: #fff; padding-left: 70px;}.b-extra__profile__settings { margin-top: 8px; color: #fff; font-family: Helvetica Neue,arial,sans-serif; font-size: 12px; display: inline-block; padding: 0 8px; height: 20px; background-color: rgba(255,255,255,0.2); line-height: 20px; cursor: pointer;}.b-extra__profile__settings:hover { color: #000; -webkit-transition: color .5s ease; transition: color .5s ease;}.b-extra-b-menu__item { height: 40px;}.b-extra-b-menu__item_no-border .b-extra-b-menu__menu-item { border: none !important;}.b-extra-b-menu__img { margin-left: 55px; margin-top: 10px; float: left;}.b-extra-b-menu__menu-item { line-height: 40px; height: 100%; margin-left: 15px; width: 165px; display: inline-block; border-bottom: 1px solid rgba(255,255,255,0.3); color: #fff;}.b-extra-b-menu__menu-item_active { background-color: rgba(255,255,255,0.3);}.b-extra-b-menu__menu-item_active .b-extra-b-menu__menu-item { border-bottom: none;}.b-extra-b-menu__menu-item__text { font-family: Helvetica Neue,arial,sans-serif; font-size: 15px; cursor: pointer;}.b-extra-b-menu__menu-item__text:hover { color: #000; -webkit-transition: color .5s ease; transition: color .5s ease;}.b-extra-b-menu__menu-item__counter { float: right; padding: 0 10px; display: inline; background-color: rgba(255,255,255,0.2); font-size: 12px; line-height: 20px; border-radius: 4px; margin-top: 10px; cursor: default;}.b-extra .b-blur_wrapper { position: absolute; left: 0; top: 0; right: 0; bottom: 0;}.b-extra-content { position: absolute; left: 0; top: 0; right: 0; bottom: 0; background-color: rgba(0,0,0,0.4);}.b-extra-content-wrapper { padding-top: 10px;}.b-extra__my-hub { padding-left: 55px; background-color: rgba(255,255,255,0.3); height: 40px; line-height: 40px; color: #fff; font-family: Helvetica Neue,arial,sans-serif; font-size: 13px; font-weight: bold; cursor: default;}';return out;
}());var app = require('main:app');
var CurrentUser = require('user:view');
var Auth = require('auth:view');
var Model = require('Header:extra_model');


module.exports = app.View.extends({

	template : module.template,

	events : {
		'click .b-extra-b-menu__menu-item__text' : 'menuClick',
		'click .b-extra__search-field' : 'seachClick',
		'blur .b-extra__search-field' : 'seachBlur',
		'wheel .b-extra-content-wrapper' : 'onWheel'
	},

	initialize : function(options) {
		this.model = new Model();
		this.super(options);
	},

	beforeInsert : function ($el, options) {
		this._activeMenuEl = $el.find('.b-extra-b-menu__menu-item_active');
		this._activeMenuEl.prev('.b-extra-b-menu__item').addClass('b-extra-b-menu__item_no-border');
	},

	menuClick : function (e) {
		this._activeMenuEl.removeClass('b-extra-b-menu__menu-item_active');
		this._activeMenuEl.prev('.b-extra-b-menu__item').removeClass('b-extra-b-menu__item_no-border');
		this._activeMenuEl = $(e.target).closest('.b-extra-b-menu__item');
		this._activeMenuEl.addClass('b-extra-b-menu__menu-item_active');
		this._activeMenuEl.prev('.b-extra-b-menu__item').addClass('b-extra-b-menu__item_no-border');
		//this.model.set('active_menu', this._activeMenuEl.data('key'));
	},

	seachClick : function (e) {
		var $el = $(e.target);
		if(!$el.data('value') || $el.val() == $el.data('value')) {
			$el.data('value', $el.val());
			$el.val('');
		}
	},

	seachBlur : function (e) {
		var $el = $(e.target);
		if(!$el.val())
			$el.val($el.data('value'));
	},

	onWheel : function (e) {
		var scroll;
		for(var key in {wheelDelta : 1, deltaY : 1, detail : 1})
			 if((scroll = e.originalEvent[key]))
			  break;

		scroll *= 0.5;
		var rect = e.currentTarget.getBoundingClientRect();

		if(rect.bottom + scroll < window.innerHeight)
			scroll = window.innerHeight - rect.bottom;
		if(rect.top + scroll > 40)
			scroll = 40 - rect.top;
		e.currentTarget._scroll = (e.currentTarget._scroll || 0) + scroll;
		e.currentTarget.style.marginTop = e.currentTarget._scroll + 'px';

		return false;
	}
});
