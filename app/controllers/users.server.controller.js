var mongoose = require('mongoose');
var Users = mongoose.model('Users');

module.exports = {
	
	save: function(req, res) {
		var _user = new Users(req.body);
		_user.save(function(err) {
			if (err) throw new Error(err);
			var data = {
				status: 1,
				user: _user,
				message: '增加用户成功!'
			}
			return res.json(data);
		})
	},

	checkUser: function(req, res) {
		var name = req.body.name;
		var password = req.body.password;

		Users.findOne({name: name}, function(err, user) {
			if (err) throw new Error(err);

			if (!user) {
				return res.redirect('/');
			}

			user.comparePassword(password, function(err, isMatch) {
				if (err) throw new Error(err);
				if (isMatch) {
					// return res.redirect('/');
					var data = {
						status: 1,
						user: user.name,
						message: '登陆成功！'
					}
					return res.json(data);
				} else {
					var data = {
						status: 0,
						message: '密码输入错误!'
					}
					return res.json(data);
				}
			})
		})
	}
}