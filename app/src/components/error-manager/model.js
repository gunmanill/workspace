var app = require('main:app');
module.exports = app.Model.extends({

	defaults: {
		moduleName: 'ERRORS',
		customError: {
			'1': 'Ошибка сервера',
			'2': 'Вы уже голосовали',
			'3': 'Что-то пошло не так'
		},
		auth : {
			'login_error' : 'Введите логин',
			'pass_error' : 'Введите пароль',
			'pass_error_length' : 'Длинна пароля не менее 6 символов',
			'email_not_valid' : 'Не валидный email',
			'login_is_short' : 'Короткий номер телефона'
		}
	}

});


