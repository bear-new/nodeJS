var mongoose = require('mongoose');

var BrandSchema = new mongoose.Schema({
	title: String,
	list: Array,
})

var Brand = mongoose.model('Brand', BrandSchema, 'brand');