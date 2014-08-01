(function () {

	var allocId = (function() {
		var id = 1;

		return function() {
			return id++;
		};
	})();


		window.cAllocList = function (createFunc) {
			var list = [];

			this.pop = function () {
				if(list.length == 0)
					return createFunc();
				else
					return list.pop();
			}

			this.push = function (el) {
				list.push(el);
			}
		};

		window.xhrList = new window.cAllocList(function () {	//create function
			var xhr;
			try {
				xhr = new window.XMLHttpRequest();

			} catch (e) {
				try {
					xhr = new ActiveXObject("Msxml2.XMLHTTP");
				} catch (e) {
					try {
						xhr = new ActiveXObject("Microsoft.XMLHTTP");
					} catch (e) {
						return false;
					}
				}
			}

			/*try {
			 xhr.upload.onprogress = xhr.onprogress = function (e) {
			 if (e.lengthComputable)
			 networkConsole.loading((e.loaded / e.total)*100);
			 }
			 } catch(e) {};
			 */
			return xhr;
		});

		var xhrReadyStateFunc = function (xhr) {
			if (xhr.readyState != 4)
				return;
			if (xhr.status == 200) {
				readRequest(xhr);
				xhr.request.destroy();
			} else {	//retry
				console.log('network error');

			}
		}

		var readRequest = function (xhr) {
			//try {
			var json = new Function('return ' + xhr.responseText)();

			var request = xhr.request;

			for(var m_id in request.querysByModule) {
				var qbm = request.querysByModule[m_id];
				for(var key in qbm) {
					//(function() {
					var query = qbm[key],
						qstring = query.query[0] + '.' + query.query[1];
					var data = json[qstring];

					delete json[qstring];

					//setTimeout(function() {
					if(query.callback)
						query.callback(data);

					//	}, 0);	//prevent freezing interface
					//})();
				}
			}
			//} catch (e) {};
			for(var key in json)
				responce_data[key] = json[key];
		};



		var ajaxRequestMethods = {
			send : function () {
				var self = this;
				this.xhr = window.xhrList.pop();

				this.xhr.request = self;

				var send = [];
				for(var m_id in this.querysByModule)
					for(var i= 0, len=this.querysByModule[m_id].length; i<len; i++)
						send.push(this.querysByModule[m_id][i].query);

				this.xhr.open('POST', '/', true);
				this.xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
				this.xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
				this.xhr.onreadystatechange = function () {
					xhrReadyStateFunc(self.xhr);
				}

				this.xhr.send(JSON.stringify(send));
				this.try_count++;
			},

			stopForModule : function (m_id) {
				this.querys_len -= this.querysByModule[m_id].length;

				delete this.querysByModule[m_id];

				if(this.querys_len == 0)
					this.destroy();
			},

			destroy : function () {

				this.xhr.onreadystatechange = function() {};
				clearTimeout(this.xhr.iId);
				this.xhr.abort();
				this.xhr.request = undefined;	//drop link
				window.xhrList.push(this.xhr);

				delete requestsById[this.requestId];

				for(var m_id in this.querysByModule)
					delete requestsByModule[m_id][this.requestId];

				for(var key in this)
					this[key] = undefined;
			}
		}


	var
		request_waits = false,
		queue = [],
		requestsById = {},
		requestsByModule = {},
		responce_data = {};

	window.async = function (query, m_id, callback) {
		var qstr = query[0] + '.' + query[1];
		if(qstr in responce_data)
			return callback(responce_data[qstr]);

		queue.push({query : query, callback : callback, m_id : m_id});

		if(!request_waits) {
			setTimeout(function () {
				var req = new cAjaxRequest(queue);
				req.send();
				queue = [];
				request_waits = false;
			}, 100);

			request_waits = true;
		}

	};

	async.appendToResponceData = function (name, data) {
		responce_data[name] = data;
	}


	var cAjaxRequest = function (queue_in, cache) {

		this.requestId = allocId();
		requestsById[this.requestId] = this;

		this.try_count = 0;

		this.querysByModule = {};	//key = m_id, value = query array
		this.querys_len = 0;
		this.method = 'POST';

		for(var key in queue_in) {
			var query = queue_in[key];

			var m_id = query.m_id;

			if(!(m_id in this.querysByModule))
				this.querysByModule[m_id] = [];
			this.querysByModule[m_id].push(query);

			if(!(m_id in requestsByModule))
				requestsByModule[m_id] = {};
			requestsByModule[m_id][this.requestId] = this;

		}

		this.querys_len = queue_in.length;
	}

	cAjaxRequest.prototype = ajaxRequestMethods;
})();