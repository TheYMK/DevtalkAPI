const { errorHandler } = require('../helpers/dbErrorHandler');
const User = require('../models/user');
const mongoose = require('mongoose');

exports.addSkill = (req, res) => {
	const { name } = req.body;

	User.findById(req.auth._id, (err, foundUser) => {
		if (err) {
			return res.status(400).json({
				error: errorHandler(err)
			});
		}

		let skills = foundUser.skills;
		skills.push(name);

		foundUser.skills = skills;

		foundUser.save((err, data) => {
			if (err) {
				return res.status(400).json({
					error: errorHandler(err)
				});
			}
			data.hashed_password = undefined;
			data.photo = undefined;
			data.name = undefined;
			data.experiences = undefined;
			data.education = undefined;
			data.availability_status = undefined;
			data.email = undefined;
			data.salt = undefined;
			data.profile = undefined;
			data.role = undefined;
			data.username = undefined;
			data.createdAt = undefined;
			data.updatedAt = undefined;
			data.bio = undefined;

			res.json(data);
		});
	});
};

exports.list = (req, res) => {
	User.findById(req.auth._id, (err, foundUser) => {
		if (err) {
			return res.status(400).json({
				error: errorHandler(err)
			});
		}

		foundUser.hashed_password = undefined;
		foundUser.salt = undefined;

		return res.json(foundUser);
	});
};

exports.remove = (req, res) => {
	const name = req.body.name;

	User.findById(req.auth._id, (err, foundUser) => {
		if (err) {
			return res.status(400).json({
				error: errorHandler(err)
			});
		}

		let skills = foundUser.skills;

		skills = skills.filter((val) => val !== name);

		foundUser.skills = skills;

		foundUser.save((err, data) => {
			if (err) {
				return res.status(400).json({
					error: errorHandler(err)
				});
			}

			data.hashed_password = undefined;
			data.photo = undefined;
			data.name = undefined;
			data.experiences = undefined;
			data.education = undefined;
			data.availability_status = undefined;
			data.email = undefined;
			data.salt = undefined;
			data.profile = undefined;
			data.role = undefined;
			data.username = undefined;
			data.createdAt = undefined;
			data.updatedAt = undefined;
			data.bio = undefined;

			res.json(data.skills);
		});
	});
};
