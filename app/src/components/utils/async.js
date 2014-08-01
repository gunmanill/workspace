/**
 * врапер для ajax запросов
 * @param app
 * @returns {{collectionAjax: Array, abort: abort, turn: Array, ajax: ajax}}
 */

module.exports = function (app) {

	var async = {


		collectionAjax: [],


		abort: function () {
			for (var i = 0; i < this.collectionAjax.length; i++) {
				if (this.collectionAjax[i].state() == 'pending') {
					this.collectionAjax[i].abort();
				}
			}
			this.collectionAjax = [];
		},


		turn: [],


		ajax: function (param_request) {
			var def = $.Deferred();
			var param = param_request;
			var dataRequest = {};
			var success = param.success || false;

			if (!_.isUndefined(param)) {
				_.extend(dataRequest, param.data);
			}


			var collectionAjaxSend = $.ajax({
				url: param.url,
				dataType: (param.dataType) ? param.dataType : 'JSON',
				type: (param.type) ? param.type : 'POST',
				data: dataRequest,
				beforeSend: function () {

					// перед отправкой показываем прелоадер
					if (!_.isUndefined(param.preloader)) {
						param.preloader.render();
					}
				},
				success: function (data) {
					//console.log(data);

					// error manager render
					if (!_.isUndefined(data.error) && !param.hideError) {

						app.ERROR.setSingleError(data.error.id);

						def.reject(data.error);

						if (!_.isUndefined(param.preloader)) {
							param.preloader.dispose();
						}
					}
					if (success) success(data);
					else def.resolve(data);

					dataRequest = null;
				},

				error: function (data) {
					if (data.status == '500') {
						app.ERROR.setSingleError(1);
					}
					(param.error) ? param.error(data) : false;
					dataRequest = null;
					def.reject();
				},

				complete: function (data) {

					// после любого ответа , уничтожаем прелоадер
					if (!_.isUndefined(param.preloader)) {
						if (!_.isUndefined(param.preloaderTimeOut)) {
							setTimeout(function () {
								param.preloader.dispose();
							}, param.preloaderTimeOut);
						} else {
							param.preloader.dispose();
						}
					}
				}
			});

			// собераем соллекцию всех запросов
			// чтобы их сбросить при переходе на другие страницы
			// вызвав метод abort
			this.collectionAjax.push(collectionAjaxSend);

			return def.promise();
		}
	};

	return async;
}


