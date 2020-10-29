const express = require('express');
const router = express.Router();
const { requireSignin, freelancerMiddleware, authMiddleware } = require('../../controllers/auth');
const { read, readFreelancerProfile, updateFreelancerProfile, photo } = require('../../controllers/user');

router.get('/user/profile', requireSignin, authMiddleware, read);

// Freelancer
router.get('/user/freelancer/profile/:username', requireSignin, freelancerMiddleware, readFreelancerProfile);
router.put('/user/freelancer/profile/update', requireSignin, freelancerMiddleware, updateFreelancerProfile);

// get user profile photo
router.get('/user/photo/:username', photo);

module.exports = router;
