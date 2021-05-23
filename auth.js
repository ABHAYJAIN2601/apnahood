var jwt = require('jsonwebtoken');
require('dotenv').config()
module.exports = (req, res, next) => {
	try {
		var token = req.header('x-auth-token');

		var decode = jwt.verify(token, process.env.SERCET);
		req.user = decode;
		next();
	} catch (error) {
		res.status(401).json({
			error: 'Invalid Token'
		});
	}
};