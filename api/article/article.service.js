const pool = require("../../config/database");
const {ARTICLE_REVIEW_STATUS} = require("../../constants/blogStatus");

module.exports = {
	createNewArticle: async (title, body, authorUserId) => {
		try {
			const res = await pool.promise().query(
				'insert into articles(title, body, status, authorId) values (?, ?, ?, ?)',
				[title, body, ARTICLE_REVIEW_STATUS, authorUserId]
			);
			return res[0].insertId;
		} catch (e) {
			console.log(e);
			return false;
		}
	},
	getArticleById: async (id) => {
		try {
			const [rows] = await pool.promise().query(
				'select * from articles where id = ?',
				[id]
			);
			if (rows.length === 0) {
				return null;
			}
			return rows[0];
		} catch (e) {
			console.log(e);
			return false;
		}
	},
	updateArticle: async (title, body, id) => {
		try {
			const res = await pool.promise().query(
				'update articles set title = ?, body = ?, status = ? where id = ?',
				[title, body, ARTICLE_REVIEW_STATUS, id]
			)
			return Number(res[0].changedRows) > 0;
		} catch (e) {
			console.log(e);
			return false;
		}
	},
	updateArticleStatus: async (status, id) => {
		try {
			const res = await pool.promise().query(
				'update articles set status = ? where id = ?',
				[status, id]
			)
			return true;
		} catch (e) {
			console.log(e);
			return false;
		}
	},
	deleteArticle: async (id) => {
		try {
			const res = await pool.promise().query(
				'delete from articles where id = ?',
				[id]
			)
			return true;
		} catch (e) {
			console.log(e);
			return false;
		}
	},
	getArticlesForUser: async (userId) => {
		try {
			const [rows] = await pool.promise().query(
				'select * from articles where authorId = ?',
				[userId]
			);
			return rows;
		} catch (e) {
			console.log(e);
			return false;
		}
	}
};
