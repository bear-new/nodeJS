var BrandController = require('../controllers/brand.server.controller');

module.exports = function(app) {
	
	app.route('/brand')
		.get(BrandController.list)

}