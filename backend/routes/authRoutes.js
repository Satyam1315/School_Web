const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { register, login, validateRegister, validateLogin } = require('../controllers/authController');

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  message: { errors: [{ msg: 'Too many requests, please try again later.' }] }
});

router.post('/register', authLimiter, validateRegister, register);
router.post('/login', authLimiter, validateLogin, login);

module.exports = router;
