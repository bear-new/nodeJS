var CarsController = require('../controllers/carsList.server.controller');

module.exports = function(app) {
	
	app.route('/carsList')
		.get(CarsController.list)
		.post(CarsController.create);

	app.route('/cars/:id')
		.get(CarsController.get);

	app.param('id', CarsController.getById);

	app.route('/carsList/query')
		.post(CarsController.getByName);

	app.route('/carsList/sort')
		.post(CarsController.getByType);

}