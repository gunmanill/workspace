require.define("blur:blur", function(require, module, exports) {var app = require('main:app');

var cBlur = app.View.extends({


	initialize : function (options) {

		var self = this;
		$(function () {
			self._blurTarget = $('.main')[0];


			self._needScreenShot = true;
			self.takeScreenShot();

			self.startObserver();

			self.on(window, 'scroll', self.scrollBlur);
			self.on(window, 'resize', self.scrollBlur)


			self.on('route', function() {
				self._needScreenShot = true;
				self.takeScreenShot();
			});
		});
	},



	promtScreenShot : function (mutations) {

		for(var i=0, len=mutations.length; i<len; i++) {

			if($(mutations[i].target).closest('.b-blur').length != 0)
				continue;

			if(mutations[i].attributeName && mutations[i].attributeName != 'style')
				continue;

			break;
		}
		if(i == len) return;

		this._needScreenShot = true;
	},

	takeScreenShot : function () {

		clearInterval(this.$scrShotIid);
		this.$scrShotIid = setInterval(this.takeScreenShot, 100);

		if(!this._needScreenShot) return;

		this._needScreenShot = false;


		this.blrs = $('.b-blur');
		this.blrs.html('');
		for(var i=0; i<this.blrs.length; i++) {
			var screenshot = this._blurTarget.cloneNode(true);
			var $screenshot = $(screenshot);
			$screenshot.find('script').remove();
			$screenshot.find('.b-blur').remove();
			$screenshot.find('.b-under-top-line').remove();
			$screenshot.find('.b-top-line').remove();
			$screenshot.find('.b-menu-list').remove();
			$screenshot.find('video').remove();
			screenshot.style.pointerEvents = 'none';
			screenshot.style.overflow = 'hidden';
			screenshot.style.webkitUserSelect = 'none';
			screenshot.style.mozUserSelect = 'none';
			screenshot.style.msUserSelect = 'none';
			screenshot.style.oUserSelect = 'none';
			screenshot.style.userSelect = 'none';

			this.blrs[i].appendChild(screenshot);
			if(!this.blrs[i]._translate)
				this.blrs[i]._translate = {
					left : 0, top : 0
				};
		}

		this.scrollBlur();
	},


	scrollBlur : function () {

		var tRect = this._blurTarget.getBoundingClientRect();
		this.blrs.each(function () {
			var cRect = $(this).children('.main')[0].getBoundingClientRect();
			$(this).css('transform', 'translate3d(' + (this._translate.left += tRect.left - cRect.left) + 'px, ' + (this._translate.top += tRect.top - cRect.top) + 'px, 0)');
		});
	},

	startObserver : function () {
		this._observer_target = document.querySelector('body .main');

		try {
			// create an observer instance
			this._observer = new MutationObserver(this.promtScreenShot);

			// configuration of the observer:
			this._observer_config = {  attributes: true, childList: true, characterData: true , subtree : true};

			// pass in the target node, as well as the observer options
			this._observer.observe(this._observer_target, this._observer_config);
		} catch (e) {
			try {
				this._observer_target.addEventListener('DOMSubtreeModified', this.iePromtScreenShot, false);
			} catch (e) {
					this._observer_target.attachEvent('onDOMSubtreeModified', this.iePromtScreenShot);
			}
		}
	},

	iePromtScreenShot : function (ev) {
		this.promtScreenShot([ev.target]);
		return false;
	}
});

module.exports = new cBlur({render : true});});