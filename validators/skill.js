const { check } = require('express-validator');

exports.skillAddValidator = [ check('name').not().isEmpty().withMessage('Skill name is required') ];
