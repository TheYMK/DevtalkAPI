const express = require('express');
const router = express.Router();

// controllers
const { contactUserForm } = require('../../controllers/form');

// validators
const { contactFormValidator } = require('../../validators/form');
const { runValidation } = require('../../validators');

router.post('/form/contact-user', contactFormValidator, runValidation, contactUserForm);

module.exports = router;
