const express = require('express');
const { login, registerPassenger } = require('../controllers/authController');

const router = express.Router();

router.post('/login', login);
router.post('/register', registerPassenger);

module.exports = router;
