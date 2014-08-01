require.define("utils:util", function(require, module, exports) {module.exports = {

	i18n : function (section, word) {
		if (window.translation != undefined && window.translation[section] && window.translation[section][word])
				return window.translation[section][word];

		return word;

	},

	getCoords: function (elem) {
		// (1)
		var box = elem.getBoundingClientRect();
		var body = document.body;
		var docEl = document.documentElement;

		// (2)
		var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
		var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

		// (3)
		var clientTop = docEl.clientTop || body.clientTop || 0;
		var clientLeft = docEl.clientLeft || body.clientLeft || 0;

		// (4)
		var top = box.top + scrollTop - clientTop;
		var left = box.left + scrollLeft - clientLeft;
		var bottom = box.bottom + scrollTop - clientTop;

		// (5)
		return {
			top: Math.round(top),
			left: Math.round(left),
			bottom: Math.round(bottom)
		};
	},

	decl: function (number, titles) {
		var cases = [2, 0, 1, 1, 1, 2];
		return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
	},

	numberRate: function (str) {
		if (!_.isUndefined(str)) {
			str = str.toString();
			return str.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
		} else {
			return '';
		}
	},

	isValidEmail: function (str) {
		var re = /^\s*[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\s*$/i;
		return re.test(str);
	},

	parseQueryString: function (queryString) {
		var params = {};
		if (queryString) {
			_.each(
				_.map(decodeURI(queryString).split(/&/g), function (el, i) {
					var aux = el.split('='), o = {};
					if (aux.length >= 1) {
						var val = undefined;
						if (aux.length == 2)
							val = aux[1];
						o[aux[0]] = val;
					}
					return o;
				}),
				function (o) {
					_.extend(params, o);
				}
			);
		}
		return params;
	},

	diff: function (date) {
		var time, words,
			minute = 60,
			hour = 3600,
			day = 86400,
			week = 604800,
			month = 2628000,
			year = 31536000;
		if (date < minute)
			return '1 минуту';
		else if (date < (time = minute) * 60)
			words = ['минуту', 'минуты', 'минут'];
		else if (date < (time = hour) * 24)
			words = ['час', 'часа', 'часов'];
		else if (date < (time = day) * 7)
			words = ['день', 'дня', 'дней'];
		else if (date < (time = week) * 5)
			words = ['неделя', 'недели', 'недель'];
		else if (date < (time = month) * 12)
			words = ['месяц', 'месяца', 'месяцев'];
		else if (time = year)
			words = ['год', 'года', 'лет'];
		var diff = parseInt(date / time);
		return diff + ' ' + context.decl(diff, words);
	},

	// Generate four random hex digits.
	S4: function () {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	},
	// Generate a pseudo-GUID by concatenating random hexadecimal.
	guid: function () {
		return (this.S4() + this.S4() + "-" + this.S4() + "-" + this.S4() + "-" + this.S4() + "-" + this.S4() + this.S4() + this.S4());
	}
};
});