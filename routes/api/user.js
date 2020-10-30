const express = require('express');
const router = express.Router();
const { requireSignin, freelancerMiddleware, authMiddleware } = require('../../controllers/auth');
const {
	read,
	readFreelancerProfile,
	updateFreelancerProfile,
	photo,
	deleteFreelancerProfile,
	readClientProfile
} = require('../../controllers/user');

router.get('/user/profile', requireSignin, authMiddleware, read);

// Freelancer
router.get('/user/freelancer/profile/:username', requireSignin, authMiddleware, readFreelancerProfile);
router.put('/user/freelancer/profile/update', requireSignin, freelancerMiddleware, updateFreelancerProfile);
router.delete('/user/freelancer/profile/delete', requireSignin, freelancerMiddleware, deleteFreelancerProfile);

// Client
router.get('/user/client/profile/:username', requireSignin, authMiddleware, readClientProfile);

// get user profile photo
router.get('/user/photo/:username', photo);

module.exports = router;
