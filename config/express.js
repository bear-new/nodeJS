var express = require('express');
var bodyParser = require('body-parser');

module.exports = function() {

	console.log('init express...');
	var app = express();

	app.use(bodyParser());
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));

	require('../app/routes/banner.server.routes')(app);
	require('../app/routes/news.server.routes')(app);
	require('../app/routes/brand.server.routes')(app);
	require('../app/routes/carsList.server.routes')(app);

	app.all('*',function (req, res, next) {
	  	res.header('Access-Control-Allow-Origin', '*');
	  	res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
	  	res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

	  	if (req.method == 'OPTIONS') {
	    	res.send(200); 
	  	}
	  	else {
	   		next();
	  	}
	});

	app.use(function(req, res, next) {
		res.status(404);
		try {
			return res.json('Not Found');
		} catch(e) {
			console.error('404 set header after sent');
		}
	})

	app.use(function(err, req, res, next) {
		if (!err) {
			return next();
		}
		try {
			return res.json(err.message || 'server error');
		} catch(e) {
			console.log('500 set header after sent');
		}
	})

	return app;
}