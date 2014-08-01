var app = require('main:app');

var cNotifications = app.Model.extends({
	defaults: {
		notifications : []
	},

	getNotifications : function (num) {
		//clean elapsed notes
		var filtered = [];
		var curTime = new Date().getTime();
		for(var i= 0, len=this.notifications.length; i<len; i++)
			if(curTime < this.notifications[i].endTime)
				filtered.push(this.notifications[i]);

		this.notifications = filtered;
		///////////////////////////

		var ret = [];
		for(var i=0; i<num; i++)
			ret[i] = this.notifications[i];
		return ret;
	},

	push : function (note) {
		this.notifications.unshift(note);
		if(this.notifications.length > app.config.maxNotifications)
			this.notifications = this.notifications.slice(0, app.config.maxNotifications);
	}
});

module.exports = new cNotifications();