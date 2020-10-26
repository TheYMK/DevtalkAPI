const express = require('express');
const router = express.Router();
// controllers
const { signup, signin, signout, preSignup } = require('../../controllers/auth');
// validators
const { runValidation } = require('../../validators');
const { userSignupValidator, userSigninValidator } = require('../../validators/auth');

router.post('/pre-signup', userSignupValidator, runValidation, preSignup);

router.post('/signup', signup);

router.post('/signin', userSigninValidator, runValidation, signin);

router.get('/signout', signout);

module.exports = router;
