require.define("user:model", function(require, module, exports) {var app = require('main:app');
module.exports = app.Model.extends({
	name : module.name
});});