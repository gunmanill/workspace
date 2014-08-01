var app = require('main:app');
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
