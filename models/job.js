const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const jobSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			trim: true,
			min: 3,
			max: 160,
			required: true
		},
		slug: {
			type: String,
			unique: true,
			index: true
		},
		description: {
			type: {},
			required: true,
			min: 200,
			max: 2000000
		},
		excerpt: {
			type: String,
			max: 1000
		},
		mtitle: {
			type: String
		},
		mdesc: {
			type: {}
		},
		photo: {
			data: Buffer,
			contentType: String
		},
		cost: {
			type: String,
			required: true
		},
		required_skills: [
			{
				type: String,
				min: 3,
				max: 10
			}
		],
		categories: [ { type: ObjectId, ref: 'Category', required: true } ],
		tags: [ { type: ObjectId, ref: 'Tag', required: true } ],
		postedBy: {
			type: ObjectId,
			ref: 'User'
		},
		assignedTo: {
			type: ObjectId,
			ref: 'User'
		}
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Job', jobSchema);
