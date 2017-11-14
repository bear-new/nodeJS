var mongoose = require('mongoose');
var News = mongoose.model('News');

module.exports = {
	
	create: function(req, res, next) {
		var news = new News(req.body);
		news.save(function(err) {
			if (err) throw new Error(err);

			data = {
				status: 1,
				news: news,
				message: '增加新闻成功!'
			}
			return res.json(data);
		})
	},

	list: function(req, res, next) {
		var pagesize = parseInt(req.query.pagesize, 10) || 10;
		var pagestart = parseInt(req.query.pagestart, 10) || 1;
	
		News
		.find()
		.skip( (pagestart - 1) * pagesize )
		.limit(pagesize)
		.exec(function(err, docs) {
			if ( err ) throw new Error('err');

			var data = {
					status: 1,
					list: docs,
					message: '查询新闻列表成功'
				}
			return res.json(data);  
		})
	},

	getById: function(req, res, next, id) {
		if (!id) throw new Error('News not Found');

		News
		.findOne({_id: id})
		.exec(function(err, doc) {
			if (err) throw new Error(err);

			if (doc) throw new Error('News not Found');

			var data = [];
			if (doc.length === 0) {
				data = {
					status: 0,
					list: [],
					message: '未搜索到该新闻相关信息'
				}
			} else {
				data = {
					status: 1,
					list: doc,
					message: '查询新闻信息成功'
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