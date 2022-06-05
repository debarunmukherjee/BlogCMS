const {verify} = require('jsonwebtoken');

module.exports = {
	authorized: (req, res, next) => {
		const token = req.cookies ? req.cookies.access_token : false;
		if (!token) {
			return res.sendStatus(403);
		}
		try {
			const data = verify(token, process.env.JWT_SECRET);
			req.userData = data.userData;
			return next();
		} catch {
			return res.sendStatus(403);
		}
	},
	unAuthorized: (req, res, next) => {
		const token = req.cookies ? req.cookies.access_token : false;
		if (token) {
			return res.sendStatus(403);
		}
		return next();
	},
	twoFAStepAuthorization: (req, res, next) => {
		const twoFAToken = req.cookies ? req.cookies.two_fa_token : false;
		if (!twoFAToken) {
			return res.sendStatus(403);
		}
		return next();
	}
}
