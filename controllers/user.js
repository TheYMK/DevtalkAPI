const User = require('../models/user');
const Job = require('../models/job');
const { errorHandler } = require('../helpers/dbErrorHandler');
const _ = require('lodash');
const formidable = require('formidable');
const fs = require('fs');

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
