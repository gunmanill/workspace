require('main:polyphils');

var Events = require('main:events');

var app = {
	allocId : (function(){
		var id = 1;
		return function() {
			return id++;
		};
	})(),

	render : function (override) {
		if(!app.mainController) {
			app.mainController = new app.Controller({
				$el : $('body'),
				parent : null,
				name : app.config.mainController.name,
				view : app.config.mainController.view,
				render : true
			});
			app.blur = new require('blur:blur');
		}
		else
			app.mainController.reRender(override);
	}
};


app = Events.extends(app);
app = new app();
module.exports = app;

var	router = require('main:router'), mvc = require('main:mvc')(app);



app.utils = require('utils:util');
app.i18n = app.utils.i18n;
app.config = require('main:config');

var cookie = require('utils:cookie');
app.getCookie = cookie.getCookie;
app.setCookie = cookie.setCookie;
app.deleteCookie = cookie.deleteCookie;



app.async = async;
if(typeof window === 'undefined' || typeof document === 'undefined') return;

/*app.enterDocument = function () {

	fireChild(app.mainView);

	function fireChild(view) {


		view.enterDocument();

		for(var key in view.children)
			fireChild(view.children[key]);
	}
}*/


// Перхват всех переходов по ссылкам
$(document).on("click", "a", function (evt) {
	var $this = $(this),
		href = $this.attr('href');

	if ($this.attr("target")) return true;
	if (/http/.test(href)) return true;

	evt.preventDefault();

	if ($(this).attr("href") != 'javascript:void(0)' && $(this).attr("href") != '#') {
		app.router.navigate($(this).attr("href"));
	}
});

//убираем pointer-events при скролле, вроде как увеличивает fps
var styleText = '.disable-hover, .disable-hover * {pointer-events: none !important;}';
var head = document.getElementsByTagName('head')[0];
var style = document.createElement('style');
style.type = 'text/css';

if(style.styleSheet)
	style.styleSheet.cssText = styleText;
else
	style.appendChild(document.createTextNode(styleText));

head.appendChild(style);

var body =$(document.body);
var siId;
$(document).on("scroll", function () {
	clearTimeout(siId);

	body.addClass('disable-hover')

	siId = setTimeout(function() {
		body.removeClass('disable-hover')
	}, 300);
});



$(function(){

	app.router = router;
//if(typeof nodejs == 'undefined')
		app.router.start();

});




