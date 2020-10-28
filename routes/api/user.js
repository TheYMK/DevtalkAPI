const express = require('express');
const router = express.Router();
const { requireSignin, freelancerMiddleware } = require('../../controllers/auth');
const { readFreelancerProfile } = require('../../controllers/user');

// Freelancer
router.get('/user/freelancer/profile/:username', requireSignin, freelancerMiddleware, readFreelancerProfile);

module.exports = router;
