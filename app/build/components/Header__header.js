module.template = function anonymous(it) {
var out='<div class="b-under-top-line"><div class="b-blur_wrapper"><div class="b-blur"></div></div></div><div class="b-menu-list controller" name="Extra" data-view="Header:extra"></div><div class="b-top-line"><div class="b-top-line-left-sec"> <div class="b-top-line-menu-left"> <span class="b-top-line-menu-left__item"></span> <span class="b-top-line-menu-left__item"></span> <span class="b-top-line-menu-left__item"></span> </div><a class="b-top-line__sitename" href="/">VeeVaVoo</a><div class="b-top-line__relWrapper"><span class="b-top-line__fillin"></span><span class="b-top-line__planet icon-sprite-planet"></span><span class="b-top-line__planet_hover icon-sprite-planet"></span></div><a class="b-top-line__create" href="/create">Create</a></div><span class="b-top-line-login"><a class="b-top-line-login__item">Login</a><a class="b-top-line-login__item b-top-line-login_shifted1">Sign up</a></span><div class="b-top-line-menu-right"> <a class="b-top-line-menu-right__item jobs" href="/jobs">Jobs</a> <a class="b-top-line-menu-right__item dating" href="/dating">Dating</a> <a class="b-top-line-menu-right__item social" href="/">Social</a></div></div><div class="b-header_showcase"><div class="b-header_popular">popular</div><div class="b-header_welcome"><span class="b-header_welcome__to b-block">Welcome to</span><span class="b-header_welcome__VeeVaVoo b-block">VeeVaVoo</span></div></div><!-- Подключаем шаблон меню --><div class="b-header-menu-bottom">';for(var i=0; i<it.menu.length; i++) { out+='<a class="b-header-menu-bottom__item js_'+(it.menu[i].filter)+'" href="/'+(it.menu[i].filter)+'">'+(it.menu[i].name)+'</a>'; } out+='</div>';return out;
};require.addCss(function anonymous(it) {
var out='.b-under-top-line { position: fixed; height: 40px; top: 0; left: 0; right: 0; z-index: 64999; overflow: hidden; width: 100%; background-color: #fff;}.b-under-top-line .b-blur_wrapper { overflow: hidden; width: 100%; height: 40px;}.b-top-line { position: fixed; height: 40px; top: 0; left: 0; right: 0; z-index: 65000; background-color: rgba(0,0,0,0.4); line-height: 40px; text-align: center;}.b-top-line_logged .b-top-line-login { display: none;}.b-top-line_logged .b-top-line__create { display: none;}.b-top-line_logged .b-top-line__relWrapper { display: inline;}.b-top-line_login-adv .b-top-line-login { -webkit-transition: opacity 1s ease; transition: opacity 1s ease; opacity: 1; margin-top: 0;}.b-top-line-login { margin: 0 auto; width: 215px; opacity: 0;}.b-top-line-login__item { background-color: rgba(172,172,172,0.9); color: #fff; width: 107px; display: inline-block; text-align: center; text-decoration: none; cursor: pointer;}.b-top-line-login__item:hover { color: #000; -webkit-transition: color .5s ease; transition: color .5s ease;}.b-top-line-login_shifted1 { margin-left: 1px;}.b-top-line__create { font-size: 15px; font-family: Helvetica Neue,arial,sans-serif; color: #fff; margin-left: 35px; text-decoration: none; cursor: pointer; opacity: 0;}.b-top-line__create:hover { color: #000; -webkit-transition: color .5s ease; transition: color .5s ease;}.b-top-line-left-sec { position: absolute; top: 0; left: 40px;}.b-top-line-menu-left { width: 25px; vertical-align: middle; display: inline-block; position: relative; cursor: pointer;}.b-top-line-menu-left_expanded .b-top-line-menu-left__item { -webkit-box-shadow: 0 0 15px 5px rgba(255,255,255,0.35); box-shadow: 0 0 15px 5px rgba(255,255,255,0.35); -webkit-transition: -webkit-box-shadow .2s ease; transition: box-shadow .2s ease;}.b-top-line-menu-left__item { display: block; height: 4px; background-color: rgba(255,255,255,0.5); margin-bottom: 3px; border-radius: 2px; -webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box; -webkit-transition: -webkit-box-shadow .2s ease; transition: box-shadow .2s ease;}.b-top-line-menu-left:hover .b-top-line-menu-left__item { -webkit-box-shadow: 0 0 15px 5px rgba(255,255,255,0.35); box-shadow: 0 0 15px 5px rgba(255,255,255,0.35); -webkit-transition: -webkit-box-shadow .2s ease; transition: box-shadow .2s ease;}.b-top-line__sitename { font-size: 20px; font-family: Helvetica Neue,arial,sans-serif; color: #fff; margin-left: 15px; text-decoration: none;}.b-top-line__sitename:hover { color: #000; -webkit-transition: color .5s ease; transition: color .5s ease;}.b-top-line__relWrapper { margin-left: 30px; position: relative; display: inline; font-size: 20px;}.b-top-line__fillin { display: inline-block; width: 20px; height: 20px;}.b-top-line__planet { position: absolute; left: 0; top: 1px;}.b-top-line__planet_hover { opacity: 0; position: absolute; left: 0; top: 1px; -webkit-transition: opacity .3s ease; transition: opacity .3s ease; cursor: pointer;}.b-top-line__planet_hover:hover { opacity: 1; -webkit-transition: opacity .3s ease; transition: opacity .3s ease;}.b-top-line-menu-right { position: absolute; right: 40px; top: 0;}.b-top-line-menu-right__item { float: right; text-decoration: none; margin-left: 35px; display: inline-block; font-size: 15px; font-family: Helvetica Neue,arial,sans-serif; color: #858586;}.b-top-line-menu-right__item_active { color: #fff;}.b-top-line-menu-right__item:hover { color: #fff; -webkit-transition: color .5s ease; transition: color .5s ease;}.b-menu-list { display: none; position: fixed; z-index: 64999; top: 40px; left: 0; background-color: #fff; text-align: left;}.b-menu-list_expanded { display: inline-block;}.b-header { -webkit-transition: height .5s ease; transition: height .5s ease; position: relative;}.b-header:after { content: \'\'; display: block; clear: both;}.b-header-menu-bottom { -webkit-box-shadow: inset 0 -35px 25px 1px rgba(0,0,0,0.7); box-shadow: inset 0 -35px 25px 1px rgba(0,0,0,0.7); position: absolute; left: 0; right: 0; bottom: 0; height: 50px; text-align: center; font-family: Helvetica Neue,arial,sans-serif; font-size: 15px;}.b-header-menu-bottom__item { display: inline-block; color: #999; text-align: center; vertical-align: middle; border-top: 1px solid #999; width: 90px; height: 100%; line-height: 50px; cursor: pointer;}.b-header-menu-bottom__item__active,.b-header-menu-bottom__item:hover { border-top-color: #fff; color: #fff;}.b-header-menu-bottom__item_active { border-top-color: #fff; color: #fff;}.b-header .b-header-menu-left { width: 50px; height: 50px; background: #f00;}.b-header_showcase { padding-top: 92px;}.b-header .b-header_popular { text-transform: uppercase; color: #fff; font-size: 25px; line-height: 24px; text-align: center; font-family: \'proxima_novabold\'; letter-spacing: 2px; display: none;}.b-header.b-header_small,.b-header.b-header_big { background: url("images/index_bg.jpg") no-repeat center 0; -webkit-background-size: 100%; background-size: 100%;}.b-header.b-header_big { height: 700px;}.b-header.b-header_big .b-header_welcome { display: block;}.b-header.b-header_big .b-header_popular { display: none;}.b-header.b-header_small { height: 300px;}.b-header.b-header_small .b-header_welcome { display: none;}.b-header.b-header_small .b-header_popular { display: block;}.b-header__menu { position: relative; padding: 20px; border-bottom: 1px solid #fff;}.b-header__menu__item { border-radius: 3px; padding: 4px 10px; margin-right: 5px; color: #fff; background-color: #ff6500;}.b-header_welcome { font-family: Helvetica Neue,arial,sans-serif; color: #fff; text-align: center;}.b-header_welcome__to { font-size: 15px; margin-bottom: 10px;}.b-header_welcome__VeeVaVoo { font-weight: bold; font-size: 50px;}';return out;
}());var app = require('main:app');
var CurrentUser = require('user:view');
var Model = require('Header:model');
var Auth = require('auth:view');


module.exports = app.View.extends({

	template : module.template,

	events : {
		'click .b-top-line-menu-left' : 'showExtra',
		'click .b-menu-list' : function (e) { e.stopPropagation(); }
	},

	initialize : function(options) {

		this.model = new Model();

		if(CurrentUser.isAuth())
			this.model.set('menu', this.model.get('menu_authorized'));
		else
			this.model.set('menu', this.model.get('menu_default'));

		this.on('authorize:user:success', this.onAuth);
		this.on('user:logout', this.onLogout);

		this.super(options);
	},

	showExtra : function (e) {

		if(!this._bMenuList.shown) {
			this._bMenuList.el.addClass('b-menu-list_expanded');
			this._bMenuList.menuLeft.addClass('b-top-line-menu-left_expanded');
			var self = this;
			$(window).scroll();
			setTimeout(function () {
				self._bMenuList.shown = true;
			}, 0);
		}
	},


	showBg : function() {
		this.$el.addClass('b-header_big');
		this._bgVisible = true;
	},

	hideBg : function() {
		this.$el.removeClass('b-header_big');
	},

	makeSmallHeader : function($el) {

		this.$el.removeClass('b-header_big').addClass('b-header_small');
	},

	makeBigHeader : function($el) {

		this.$el.removeClass('b-header_small').addClass('b-header_big');

		Auth.show(($el || this.$el).find('.b-header_showcase'));
	},

	onAuth : function () {
		this.$topLine.addClass('b-top-line_logged');

		this.makeSmallHeader();
	},

	onLogout : function () {
		this.$topLine.removeClass('b-top-line_logged');
		this.makeBigHeader();
	},


	loginAdv : function () {
		if(window.scrollY < 425) return;
		this.$topLine.addClass('b-top-line_login-adv');
		this.off(document, 'scroll', this.loginAdv);
	},

	beforeInsert : function($el, options) {

		this._bMenuList = {
			el : $el.find('.b-menu-list'),
			shown : false,
			menuLeft : $el.find('.b-top-line-menu-left')
		};

		this.$topLine = $el.find('.b-top-line');

		if(CurrentUser.isAuth())
			this.onAuth();
		else
			this.on(document, 'scroll', this.loginAdv);

		this.on(document, 'click', this.hideExtra);


		if(CurrentUser.isAuth())
			this.makeSmallHeader($el);
		else
			this.makeBigHeader($el);

		this.super($el, options);
	},

	/*createMenu : function(options) {
		this.$el.find('.b-header-menu-bottom__item').each(function(){
			(new HeaderMenu(_.extend(options, {
				el : $(this),
				model : {filter : $(this).data('filter')}
			})));
		});
	},*/

	hideExtra : function (e) {
		if(this._bMenuList.shown && $(e.target).closest('.b-menu-list').length == 0) {
			this._bMenuList.el.removeClass('b-menu-list_expanded');
			this._bMenuList.menuLeft.removeClass('b-top-line-menu-left_expanded');
 			this._bMenuList.shown = false;
		}
	}
});
