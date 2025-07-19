const express = require('express');
const router = express.Router();
const { addClass, getAllClasses, deleteClass, updateClass } = require('../controllers/classController');
const auth = require('../middleware/authMiddleware');

router.post('/add', auth, addClass);
router.get('/', auth, getAllClasses);
router.delete('/:id', auth, deleteClass);
router.put('/:id', auth, updateClass);

module.exports = router;
