const router = require("express").Router();
const {check,query} = require('express-validator');
const {
	authorized,
	superAdminAuthorized,
	articleCreateAuthorized,
	articleDetailsViewAuthorized,
	articleExists,
	articleEditAuthorized
} = require("../../middlewares/auth");
const {
	createArticle,
	getArticlesForCurrentUser,
	getArticleDetails,
	updateArticleDetails,
	deleteOldArticle
} = require('./article.controller');

router.post(
	'/create',
	[
		authorized,
		articleCreateAuthorized,
		check('body').not().isEmpty().withMessage('Article body cannot be empty'),
		check('title').not().isEmpty().withMessage('Title cannot be empty')
	],
	createArticle
);

router.get(
	'/get/mine',
	[
		authorized,
		articleCreateAuthorized,
	],
	getArticlesForCurrentUser
);

router.get(
	'/get-details',
	[
		authorized,
		query('id')
			.not().isEmpty().withMessage('Article id cannot be empty')
			.isInt().withMessage('Article id must be an integer'),
		articleExists,
		articleDetailsViewAuthorized,
	],
	getArticleDetails
);

router.put(
	'/update/details',
	[
		authorized,
		check('body').not().isEmpty().withMessage('Article body cannot be empty'),
		check('title').not().isEmpty().withMessage('Title cannot be empty'),
		check('id')
			.not().isEmpty().withMessage('Article id cannot be empty')
			.isInt().withMessage('Article id must be an integer'),
		articleExists,
		articleEditAuthorized
	],
	updateArticleDetails
);

router.delete(
	'/delete',
	[
		authorized,
		check('id')
			.not().isEmpty().withMessage('Article id cannot be empty')
			.isInt().withMessage('Article id must be an integer'),
		articleExists,
		articleEditAuthorized
	],
	deleteOldArticle
);

module.exports = router;
