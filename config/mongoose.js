var mongoose = require('mongoose');
var config = require('./config');

module.exports = function() {
	var db = mongoose.connect(config.mongodb, {
		useMongoClient: true,
	});

	require('../app/models/users.server.model');
	require('../app/models/banner.server.model');
	require('../app/models/news.server.model');
	require('../app/models/brand.server.model');
	require('../app/models/carsList.server.model');
}