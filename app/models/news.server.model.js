var mongoose = require('mongoose');

var NewsSchema = new mongoose.Schema({
	link: String,
	img: String,
	title: String,
	des: String,
	other: {
		user: String,
		time: {type: Date, default: Date.now},
		pl: Number
	}
})

var News = mongoose.model('News', NewsSchema);