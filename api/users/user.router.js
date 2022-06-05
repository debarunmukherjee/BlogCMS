const router = require("express").Router();
const { authorized, unAuthorized, twoFAStepAuthorization } = require("../../middlewares/auth");
const {check} = require('express-validator');
const { createUser, login, logout, getUserDetails, checkIfUserCanProceedTo2FA } = require("./user.controller");
const {checkEmailIsInUse} = require("./user.service");

router.post(
	"/register",
	[
		unAuthorized,
		check('fullname').not().isEmpty().withMessage('Full name cannot be empty'),
		check('email')
			.not().isEmpty().withMessage('Email cannot be empty')
			.isEmail().withMessage('Invalid email provided')
			.custom(value => {
				return checkEmailIsInUse(value).then(res => {
					if (res) {
						return Promise.reject('E-mail already in use');
					}
				})
			}),
		check('password')
			.not().isEmpty().withMessage('Password field cannot be empty')
			.custom((value, {req}) => {
				if (value !== req.body.confirmPassword) {
					throw new Error("Passwords don't match");
				} else {
					return value;
				}
			}),
		check('dob').not().isEmpty().withMessage('Date of birth cannot be empty')
	],
	createUser
);

router.post(
"/login",
	[
		unAuthorized,
		check("email")
			.not().isEmpty().withMessage('Email cannot be empty')
			.isEmail().withMessage('Invalid email provided'),
		check('password')
			.not().isEmpty().withMessage('Password field cannot be empty')
	],
	checkIfUserCanProceedTo2FA
);

router.post(
	"/login-2fa",
	[
		twoFAStepAuthorization,
		check("email")
			.not().isEmpty().withMessage('Email cannot be empty')
			.isEmail().withMessage('Invalid email provided'),
		check('password')
			.not().isEmpty().withMessage('Password field cannot be empty'),
		check('dob').not().isEmpty().withMessage('Date of birth cannot be empty')
	],
	login
);
router.post("/logout", authorized, logout);

router.get("/user-details", authorized, getUserDetails);

module.exports = router;
