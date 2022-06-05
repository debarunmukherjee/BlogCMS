const pool = require("../../config/database");
const { SUPER_ADMIN, ADMIN, VIEWER } = require('../../constants/role');

module.exports = {
	createNewUser: (data, callBack) => {
		pool.query(
			`insert into users(fullname, email, password, role, dob)
                values(?,?,?,?,?)`,
			[
				data.fullname,
				data.email,
				data.password,
				VIEWER,
				data.dob
			],
			(error, results) => {
				if (error) {
					callBack(error);
					return;
				}
				callBack(null, results);
			}
		);
	},
	getUserByUserEmail: (email, callBack) => {
		pool.query(
			`select * from users where email = ?`,
			[email],
			(error, results) => {
				if (error) {
					callBack(error);
					return;
				}
				callBack(null, results[0]);
			}
		);
	},
	getUserById: async (userId) => {
		try {
			const [rows] = await pool.promise().query(`select * from users where id = ?`, [userId]);
			return rows[0];
		} catch (e) {
			console.log(e);
			return false;
		}
	},
	checkEmailIsInUse: async (email) => {
		try {
			const [rows] = await pool.promise().query(`select *from users where email = ?`, [email]);
			return !!rows[0];
		} catch (e) {
			console.log(e);
			return false;
		}
	}
};
