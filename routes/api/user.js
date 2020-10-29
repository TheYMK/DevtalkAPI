const express = require('express');
const router = express.Router();
const { requireSignin, freelancerMiddleware } = require('../../controllers/auth');
const { readFreelancerProfile, updateFreelancerProfile, photo } = require('../../controllers/user');

// Freelancer
router.get('/user/freelancer/profile/:username', requireSignin, freelancerMiddleware, readFreelancerProfile);
router.put('/user/freelancer/profile/update', requireSignin, freelancerMiddleware, updateFreelancerProfile);

router.get('/user/photo/:username', photo);

module.exports = router;
