var mongoose = require('mongoose');
var Banner = mongoose.model('Banner');

module.exports = {

	list: function(req, res, next) {
		var pagesize = parseInt(req.query.pagesize, 10) || 10;
		var pagestart = parseInt(req.query.pagestart, 10) || 1;
		
		Banner
		.find()
		.skip( (pagestart - 1) * pagesize )
		.limit(pagesize)
		.exec(function(err, docs) {
			if ( err ) throw new Error('err');

			var data = {
					status: 1,
					list: docs,
					message: '查询轮播图成功'
				}
			return res.json(data);  
		})
	},
}