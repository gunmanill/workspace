require.define("auth:view", function(require, module, exports) {module.template = function anonymous(it) {
var out='<i class="icon-sprite-close close-popup"></i><div class="w-component-auth"><div class="component-auth__errors"></div><div class="component-auth__header"><h3>Sign Up</h3></div><div class="component-auth__body"><form class="component-auth__form"><div class="component_form"><input type="text" class="component_form__login" value="" placeholder="Phone / E-Mail" /></div><div class="component_form"><input type="password" class="component_form__password" value="" placeholder="Password" /></div><div class="component-auth__button"><span class="btn btn-purple">Keep me logged in</span><button class="btn btn-purple btn-without_bg btn-log-in js-auth" type="submit">Log in</button></div></form></div><div class="component-auth__footer"></div></div>';return out;
};require.addCss(function anonymous(it) {
var out='.component-auth { width: 270px; background: #fff; border-radius: 4px;}.component-auth_embedded { margin: 13px auto 0;}.component-auth .w-component-auth { padding: 12px; position: relative; background-color: #fff;}.component-auth__errors { position: absolute; top: 0; left: 0; right: 0; background: #ec7e44; min-height: 20px; padding: 10px 0; text-align: center; color: #fff; visibility: hidden;}.component-auth .close-popup { right: 12px; top: 12px; width: 12px; height: 13px; position: absolute; cursor: pointer; display: none;}.component-auth__header { text-align: center; padding: 5px 0;}.component-auth__body { padding: 5px 0;}.component-auth .component_form input { width: 100%;}.component-auth__footer { border-top: 1px solid #d0cfcf; padding: 15px 0;}.component-auth__button:after { content: \'\'; display: block; clear: both;}.component-auth .btn-log-in { float: right; margin-right: 0;}';return out;
}());var app = require('main:app'),
	CurrentUser = require('user:view'),
	Model = require('auth:model');

var Auth = app.View.extends({

	className : 'component-auth',
	template : module.template,

	events: {
		'click .js-auth': 'submitAuth',
		'submit .component-auth__form' : 'submitAuth',
		'click .close-popup': 'hide'
	},

	initialize : function (options) {

		this.model = new Model();
		var self = this;
		this.on('auth:show', function (elem) {
			self.show(elem);
		});


		this.on('authorize:user:success', function () {
			self.$el.addClass('animated slideOutUp');

			setTimeout(function () {
				self.hide();
				self.$el.removeClass('animated slideOutUp');
			}, 400);
		});

		// если на кнопке есть класс необходимости авторизации
		/*this.on(document, 'click', '.need-auth', function (evt) {
			evt.preventDefault();
			evt.stopPropagation();

			that.show();
		});*/

		// если на кнопке есть класс необходимости авторизации
		/*$(document).on('click', '.logout', function (evt) {
			evt.preventDefault();
			evt.stopPropagation();

			that.logOut();
		});*/

		this.on('user:logout', function () {
			self.show();
		});

		this.super(options);
	},

	show : function (opt_elem) {

		if (!CurrentUser.isAuth()) {
			if (opt_elem) {
				this.$el.addClass('component-auth_embedded');
				$(opt_elem).append(this.el);
			} else {
				this.$el.addClass('modal-popup');
				$('body').addClass('modal-active');

				this._fide = $('<div class="fade" />').appendTo('body');
				$('body').append(this._fide);
				document.body.appendChild(this.el);
			}

		} else {
			console.log('i am autorize');
		}
	},

	hide: function () {
		if (this._fide) {
			this._fide.remove();
		}
		$('body').removeClass('modal-active');
		this.$el.detach();
	},

	submitAuth: function (evt) {
		evt.preventDefault();
		evt.stopPropagation();

		if (this.validate()) {
			this.authUser(this.validate());
		}
	},


	validLogin: function () {
		var login = $.trim(this._login.val());

		if (login != '') {

			// если email
			if (isNaN(parseInt(login))) {
				if (app.util.isValidEmail(login)) {
					return login;
				} else {
					app.Errors.setError('auth', 'email_not_valid', this._errorContainer);
				}
				// если телефон
			} else if (!isNaN(parseInt(login))) {
				
				if ((login.length >= 10 && login.length <= 11)) {
					return login;
				} else {
					app.Errors.setError('auth', 'login_is_short', this._errorContainer);
				}
			}

		}
		else {
			app.Errors.setError('auth', 'login_error', this._errorContainer);
		}
	},

	/**
	 * Длинна пароля не менее 6 символов
	 * @returns {*}
	 */
	validPassword: function () {
		var pass = $.trim(this._password.val());
		if (pass != '') {
			if (pass.length >= 6) {
				return pass;
			} else {
				app.Errors.setError('auth', 'pass_error_length', this._errorContainer);
				return false;
			}
		} else {
			app.Errors.setError('auth', 'pass_error', this._errorContainer);
			return false;
		}
	},

	/**
	 * Валидируем поля формы авторизации
	 * @returns {boolean}
	 */
	validate: function () {
		var login = $.trim(this._login.val());
		var pass = $.trim(this._password.val());
		if (this.validLogin() && this.validPassword()) {
			return {
				login: login,
				password: pass
			};
		}
	},

	logOut: function () {
		if (CurrentUser.isAuth()) {
			CurrentUser.userLogout()
		} else {
			console.log('not auth');
		}
	},

	authUser: function (data_auth) {
		if (data_auth && !CurrentUser.isAuth()) {
			CurrentUser.userLogin(data_auth);
		}
	},

	beforeInsert : function ($el, options) {
		$el = $el || this.$el;
		this._login = $el.find('.component_form__login');
		this._password = $el.find('.component_form__password');
		this._errorContainer = $el.find('.component-auth__errors');
	}

});


module.exports = new Auth({name : 'auth', render : true});});