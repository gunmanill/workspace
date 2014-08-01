var app = require('main:app');
var Model = require('user:model');


var curUser = app.View.extends({

	initialize : function (options) {

		this.model = new Model();

		if (window.CURRENT_USER)
			this.model.set(window.CURRENT_USER);

	},


	isAuth : function () {
		if(this.model.get('login') && this.model.get('login') != '')
			return true;
		return false;
	},

	userLogin : function () {
		var self = this;
		app.async([this.model.name + '.login', {
				'login' : this.model.get('login'),
				'hashedPassword' : this.model.get('password')
			}],
			function (response) {
				self.model.save(response);
				app.trigger('authorize:user:success', this);
			});
	},

	userLogout : function () {
		window.CURRENT_USER = null;
		var self = this;
		// если все успешно удалено: прокидываем событие
		if (this.isAuth()) {
			app.async([this.model.name + '.logout', {}],
				function (data) {
					self.model.clear();
					app.trigger('user:logout');
				});
		}
	}
});

module.exports = new curUser();
