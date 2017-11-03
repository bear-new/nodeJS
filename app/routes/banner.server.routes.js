var BannerController = require('../controllers/banner.server.controller');

module.exports = function(app) {
	
	app.route('/banner')
		.get(BannerController.list)

}