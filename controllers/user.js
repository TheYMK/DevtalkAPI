const User = require('../models/user');
const Job = require('../models/job');
const { errorHandler } = require('../helpers/dbErrorHandler');
const _ = require('lodash');
const formidable = require('formidable');
const fs = require('fs');
const { use } = require('../routes/api/user');

//=====================================================
// 					FREELANCER
//=====================================================

// profile controller
// this is because the below middlewares makes all user information available in req.profile including hashed password and we don't really need it
exports.read = (req, res) => {
	req.profile.hashed_password = undefined;
	return res.json(req.profile);
};

// freelancer profile controller
exports.readFreelancerProfile = (req, res) => {
	let username = req.params.username;

	let user;
	let jobs;

	User.findOne({ username }).exec((err, userFromDB) => {
		if (err || !userFromDB) {
			return res.status(400).json({
				error: 'Freelancer not found'
			});
		}

		user = userFromDB;
		let userId = user._id;

		Job.find({ postedBy: userId })
			.populate('categories', '_id name slug')
			.populate('tags', '_id slug name')
			.populate('postedBy', '_id name')
			.select('_id title slug excerpt categories tags postedBy cost required_skills, createdAt updatedAt')
			.exec((err, data) => {
				if (err) {
					return res.status(400).json({
						error: errorHandler(err)
					});
				}

				// We don't want those;
				user.photo = undefined;
				user.hashed_password = undefined;

				res.json({
					user,
					jobs: data
				});
			});
	});
};

exports.updateFreelancerProfile = (req, res) => {
	let form = new formidable.IncomingForm();
	form.keepExtensions = true;
	form.parse(req, (err, fields, files) => {
		if (err) {
			return res.status(400).json({
				error: 'Profile photo could not be uploaded'
			});
		}

		let user = req.profile;

		let existingRole = user.role;
		let existingEmail = user.email;

		if (fields.password && fields.password.length < 6) {
			return res.status(400).json({
				error: 'Password should be at least 6 characters long'
			});
		}

		user = _.extend(user, fields);
		// user's existing role and email - dont update - keep it same
		user.role = existingRole;
		user.email = existingEmail;

		if (files.photo) {
			if (files.photo.size > 1000000) {
				return res.status(400).json({
					error: 'Image should be less than 1MB'
				});
			}

			user.photo.data = fs.readFileSync(files.photo.path);
			user.photo.contentType = files.photo.type;
		}

		user.save((err, result) => {
			if (err) {
				return res.status(400).json({
					error: errorHandler(err)
				});
			}

			user.hashed_password = undefined;
			user.salt = undefined;
			user.photo = undefined;
			res.json(user);
		});
	});
};

exports.deleteFreelancerProfile = async (req, res) => {
	try {
		await User.findByIdAndRemove(req.auth._id);
		return res.json({
			message: 'profile deleted successfully'
		});
	} catch (err) {
		return res.json(400).json({
			error: errorHandler(err)
		});
	}
};

exports.photo = (req, res) => {
	const username = req.params.username;

	User.findOne({ username }).exec((err, user) => {
		if (err || !user) {
			return res.status(400).json({
				error: 'User not found'
			});
		}

		if (user.photo.data) {
			res.set('Content-Type', user.photo.contentType);

			return res.send(user.photo.data);
		}
	});
};

//=====================================================
// 					CLIENT
//=====================================================
