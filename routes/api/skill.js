const express = require('express');
const router = express.Router();

// controllers
const { requireSignin, authMiddleware } = require('../../controllers/auth');
const { addSkill, list, remove } = require('../../controllers/skill');
// validators
const { runValidation } = require('../../validators');
const { skillAddValidator } = require('../../validators/skill');

router.post('/skill/add', skillAddValidator, runValidation, requireSignin, authMiddleware, addSkill);
router.get('/skills', requireSignin, authMiddleware, list);
router.delete('/skill/remove', requireSignin, authMiddleware, remove);

module.exports = router;
