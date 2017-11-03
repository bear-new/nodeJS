var mongoose = require('mongoose');

var BannerSchema = new mongoose.Schema({
	link: String,
	img: String,
})

var Banner = mongoose.model('Banner', BannerSchema, 'banner');