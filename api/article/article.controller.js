const {validationResult} = require("express-validator");
const {
	createNewArticle,
	getArticlesForUser,
	getArticleById,
	updateArticle,
	deleteArticle
} = require('./article.service');

module.exports = {
	createArticle: async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({
				success: false,
				message: "Invalid data",
				errors: errors.array()
			});
		}
		const body = req.body;
		const result = await createNewArticle(body.title, body.body, req.userData.id);
		if (result) {
			return res.status(201).json({
				success: 1,
				message: 'Article created successfully',
				data: {id: result}
			});
		}
		return res.status(500).json({
			success: 0,
			message: 'Some server error occurred',
			data: undefined
		});
	},
	getArticlesForCurrentUser: async (req, res) => {
		const userId = req.userData.id;
		const articles = await getArticlesForUser(userId);
		if (articles === false) {
			return res.status(500).json({
				success: 0,
				message: 'Some server error occurred',
				data: undefined
			});
		}
		return res.status(200).json({
			success: 1,
			message: 'Articles fetched successfully',
			data: articles
		});
	},
	getArticleDetails: async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({
				success: false,
				message: "Invalid data",
				errors: errors.array()
			});
		}
		const articleId = req.query.id;
		const article = await getArticleById(articleId);
		if (article === false) {
			return res.status(500).json({
				success: 0,
				message: 'Some server error occurred',
				data: undefined
			});
		}
		return res.status(200).json({
			success: 1,
			message: 'Article fetched successfully',
			data: article
		});
	},
	updateArticleDetails: async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({
				success: false,
				message: "Invalid data",
				errors: errors.array()
			});
		}
		const body = req.body;
		const result = await updateArticle(body.title, body.body, body.id);
		if (result) {
			return res.status(200).json({
				success: 1,
				message: 'Article updated successfully',
				data: undefined
			});
		}
		return res.status(500).json({
			success: 0,
			message: 'Some server error occurred',
			data: undefined
		});
	},
	deleteOldArticle: async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({
				success: false,
				message: "Invalid data",
				errors: errors.array()
			});
		}
		const body = req.body;
		const result = await deleteArticle(body.id);
		if (result) {
			return res.status(200).json({
				success: 1,
				message: 'Article deleted successfully',
				data: undefined
			});
		}
		return res.status(500).json({
			success: 0,
			message: 'Some server error occurred',
			data: undefined
		});
	},
};
