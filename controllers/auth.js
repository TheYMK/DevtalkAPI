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

// signin controller
exports.signin = (req, res) => {
	const { email, password } = req.body;

	// check if user exists
	User.findOne({ email: email }).exec((err, foundUser) => {
		if (err || !foundUser) {
			return res.status(400).json({
				error: 'User with that email does not exist. You may have to sign up first'
			});
		}

		// authenticate
		if (!foundUser.authenticate(password)) {
			return res.status(401).json({
				error: 'Email and password do not match'
			});
		}

		// generate a token and send to client
		const token = jwt.sign({ _id: foundUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
		// send the token to the browser cookie
		res.cookie('token', token, { expiresIn: '1d' });

		const { _id, username, name, email, role } = foundUser;

		return res.json({
			token,
			user: { _id, username, name, email, role }
		});
	});
};

// signout controller
exports.signout = (req, res) => {
	res.clearCookie('token');
	res.json({
		message: 'Signout success'
	});
};

// middleware to apply to any route we want to protect to only logged-in users
// will compare the incoming token secret with the secret we have in our .env file
// will return true if the token hasn't expired
// it also make the user available in request object. Because the token has the user ID and the expiry date
exports.requireSignin = expressJwt({
	secret: process.env.JWT_SECRET,
	algorithms: [ 'HS256' ],
	userProperty: 'auth' // user available in req.auth as long as there is a valid token
});

// Admin middleware
exports.adminMiddleware = (req, res, next) => {
	const adminUserId = req.auth._id;
	User.findById({ _id: adminUserId }).exec((err, user) => {
		if (err || !user) {
			return res.status(400).json({
				error: 'User not found'
			});
		}

		if (user.role !== 1) {
			return res.status(400).json({
				error: 'Admin resource. Access denied'
			});
		}

		req.profile = user;
		next();
	});
};

// Freelancer Middleware
exports.freelancerMiddleware = (req, res, next) => {
	const freelancerUserId = req.auth._id;

	User.findById({ _id: freelancerUserId }).exec((err, user) => {
		if (err || !user) {
			return res.status(400).json({
				error: 'User not found'
			});
		}

		if (user.role !== 3) {
			return res.status(400).json({
				error: 'Freelancer resource. Access denied'
			});
		}

		req.profile = user;
		next();
	});
};

// Client Middleware
exports.clientMiddleware = (req, res, next) => {
	const clientUserId = req.auth._id;

	User.findById({ _id: clientUserId }).exec((err, user) => {
		if (err || !user) {
			return res.status(400).json({
				error: 'User not found'
			});
		}

		if (user.role !== 2) {
			return res.status(400).json({
				error: 'Client resource. Access denied'
			});
		}

		req.profile = user;
		next();
	});
};
