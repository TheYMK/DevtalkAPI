const express = require('express');
const router = express.Router();
// controllers
const { signup, signin, signout, preSignup, forgotPassword, resetPassword } = require('../../controllers/auth');
// validators
const { runValidation } = require('../../validators');
const {
	userSignupValidator,
	userSigninValidator,
	forgotPasswordValidator,
	resetPasswordValidator
} = require('../../validators/auth');

router.post('/auth/pre-signup', userSignupValidator, runValidation, preSignup);

router.post('/auth/signup', signup);

router.post('/auth/signin', userSigninValidator, runValidation, signin);

router.get('/auth/signout', signout);

router.put('/auth/forgot-password', forgotPasswordValidator, runValidation, forgotPassword);

router.put('/auth/reset-password', resetPasswordValidator, runValidation, resetPassword);
module.exports = router;
