var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;


var UsersSchema = new mongoose.Schema({
	name: {
		unique: true,
		type: String
	},
	password: String,
	meta: {
		createAt: {
			type: Date,
			default: Date.now()
		},
		updateAt: {
			type: Date,
			default: Date.now()
		}
	}
})

UsersSchema.pre('save', function(next) {
	var user = this;

	if (this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now()
	} else {
		this.meta.updateAt = Date.now();
	}
	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
		if (err) return next(err)

			bcrypt.hash(user.password, salt, function(err, hash) {
				if (err) return next(err);
				user.password = hash;
				next();
			})
	})

	next();
})

UsersSchema.methods = {
	comparePassword: function(_password, cb) {
		// var dataBasePassword = this.password;
		// bcrypt.compare(_password, dataBasePassword, function(err, isMatch) {
		// 	if (err) return cb(err)

		// 	cb(null, isMatch);
		// })
		if (_password == this.password) {
			isMatch = true;
		} else {
			isMatch = false;
		}

		cb(null, isMatch);
	}
}

var Users = mongoose.model('Users', UsersSchema);