var app = require('main:app');

module.exports = app.View.extends({

	componentName: 'preloader',

	initialize: function (options) {
		var that = _.bindAll(this);

		if (options.position) {
			this.$el.addClass('clear-position');
			this.$el.css(options.position);
		}

	},

	events: {

	},

	tagName: 'div',

	className: 'preloader preloader-root',

	render: function (opt_element) {
		if (this.options.element) {
			$(this.options.element).append(this.$el);
		} else {
			if(!_.isUndefined(opt_element))
				$(opt_element).append(this.$el);
		}
		return this;
	}
});

