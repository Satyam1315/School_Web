const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

// Validation middleware
exports.validateRegister = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role').optional().isIn(['admin', 'teacher', 'student', 'staff']).withMessage('Invalid role'),
];

exports.validateLogin = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

// Register staff
exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ errors: [{ msg: 'User already exists' }] });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword, role: role || 'staff' });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ errors: [{ msg: error.message }] });
  }
};

// Login staff
exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ errors: [{ msg: error.message }] });
  }
};
