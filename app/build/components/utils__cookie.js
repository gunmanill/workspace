// работа с куками
module.exports = {
	getCookie : function (name) {
		var matches = document.cookie.match(new RegExp(
				"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
		return matches ? decodeURIComponent(matches[1]) : undefined;
	},

	setCookie : function (name, value, options) {
		var options = options || {},
			value,
			expires,
			updatedCookie;

		expires = options.expires;

		if (typeof expires == "number" && expires) {
			var d = new Date();
			d.setTime(d.getTime() + expires * 1000);
			expires = options.expires = d;
		}
		if (expires && expires.toUTCString) {
			options.expires = expires.toUTCString();
		}

		value = value; //encodeURIComponent(value);

		updatedCookie = name + "=" + value;

		for (var propName in options) {
			updatedCookie += "; " + propName;
			var propValue = options[propName];
			if (propValue !== true) {
				updatedCookie += "=" + propValue;
			}
		}

		document.cookie = updatedCookie;
	},

	deleteCookie : function (name) {
		app.setCookie(name, "", {
			path: '/',
			expires: -1
		});
	}
}
