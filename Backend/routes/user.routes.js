const express = require('express');
const { register, login, refreshToken } = require('../controllers/user.controllers');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/refreshToken', refreshToken);

module.exports = router;