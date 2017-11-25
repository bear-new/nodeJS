var UsersController = require('../controllers/users.server.controller');

module.exports = function(app) {
	
	app.route('/users/signUp')
		.post(UsersController.save);

	app.route('/users/signIn')
		.post(UsersController.checkUser);

}