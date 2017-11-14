var mongoose = require('mongoose');
mongoose.Promise = Promise;
var Cars = mongoose.model('Cars');

module.exports = {
	
	create: function(req, res, next) {
		var cars = new Cars(req.body);
		cars.save(function(err) {
			if (err) throw new Error(err);

			data = {
				status: 1,
				car: cars,
				message: '增加汽车数据成功!'
			}
			return res.json(data);
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
			if ( err ) throw new Error('err');

			var data = {
					status: 1,
					list: docs,
					message: '查询汽车信息成功'
				}
			return res.json(data);  
		})
	},

	// req.params.xxxxx 从path中的变量
	// req.query.xxxxx 从get中的?xxxx=中
	// req.body.xxxxx 从post中的变量
	getByName: function(req, res, next) {
		var name = req.body.name;
		if (!name) {
			throw new Error('请输入需要查找的汽车信息');
		}

		var qs = new RegExp(name);
		Cars
		.find({name: qs})
		.exec(function(err, doc) {
			if (err) throw new Error(err);
			var data = [];
			if (doc.length === 0) {
				data = {
					status: 0,
					list: [],
					message: '未搜索到该汽车相关信息'
				}
			} else {
				data = {
					status: 1,
					list: doc,
					message: '查询汽车列表成功'
				}
			}
			return res.json(data);
		})
	},

	getById: function(req, res, next, id) {
		if (!id) return next(new Error('Cars not Found'));

		Cars
		.findOne({_id: id})
		.exec(function(err, doc) {
			if (err) throw new Error(err);
			var data = [];
			if (doc.length === 0) {
				data = {
					status: 0,
					list: [],
					message: '未搜索到该汽车相关信息'
				}
			} else {
				data = {
					status: 1,
					list: doc,
					message: '查询汽车信息成功'
				}
			}
			req.data = data;
			return next();
		})
	},

	get: function(req, res, next) {
		return res.json(req.data);
	}
}