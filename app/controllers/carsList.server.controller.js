var mongoose = require('mongoose');
var Cars = mongoose.model('Cars');

module.exports = {
	
	create: function(req, res, next) {
		var cars = new Cars(req.body);
		cars.save(function(err) {
			if (err) return next(err);

			return res.json(cars);
		})
	},

	list: function(req, res, next) {
		var pagesize = parseInt(req.query.pagesize, 10) || 10;
		var pagestart = parseInt(req.query.pagestart, 10) || 1;
	
		Cars
		.find()
		.skip( (pagestart - 1) * pagesize )
		.limit(pagesize)
		.exec(function(err, docs) {
			if ( err ) return next(err);

			return res.json(docs);  
		})
	},

	getById: function(req, res, next, id) {
		if (!id) return next(new Error('Cars not Found'));

		Cars
		.findOne({_id: id})
		.exec(function(err, doc) {
			if (err) return next(err);

			if (doc) return next(new Error('Cars not Found'));

			req.cars = doc;
			return next();
		})
	},

	getByName: function(req, res, next, name) {
		if (!name) return next(new Error('Cars not Found'));

		Cars
		.findOne({name: name})
		.exec(function(err, doc) {
			if (err) return next(err);

			if (doc) return next(new Error('Cars not Found'));

			req.cars = doc;
			return next();
		})
	},

	get: function(req, res, next) {
		return res.json(req.cars);
	}
}