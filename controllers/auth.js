const User = require('../models/user');
const shortId = require('shortid');
const jwt = require('jsonwebtoken'); // to create token
const expressJwt = require('express-jwt'); // To check if token is valid or has expired
const { errorHandler } = require('../helpers/dbErrorHandler');
const _ = require('lodash');
const { OAuth2Client } = require('google-auth-library');

// signup controller
exports.signup = (req, res) => {
	// Check if the user already exists
	User.findOne({ email: req.body.email }).exec((err, foundUser) => {
		if (foundUser) {
			return res.status(400).json({
				error: 'Email is already taken'
			});
		}

		const { name, email, password, role } = req.body;

		let username = shortId.generate();
		let profile = `${process.env.CLIENT_URL}/profile/${username}`;

		let newUser = new User({ name, email, password, profile, username, role });

		newUser.save((error, createdUser) => {
			if (err) {
				if (err) {
					return res.status(400).json({
						error: err
					});
				}
			}

			res.json({
				message: 'Signup success! Please login'
			});
		});
	});
};
