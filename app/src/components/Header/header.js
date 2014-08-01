var app = require('main:app');
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
