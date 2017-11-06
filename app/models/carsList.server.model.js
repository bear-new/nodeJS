var mongoose = require('mongoose');
mongoose.Promise = Promise;

var CarsSchema = new mongoose.Schema({
	img: String,
	name: String,
	price: String,
	type: String,
	gearbox: String
})

var Cars = mongoose.model('Cars', CarsSchema, 'carsList');