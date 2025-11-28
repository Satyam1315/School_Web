const express = require('express');
const router = express.Router();
const { addTeacher, getAllTeachers, deleteTeacher, updateTeacher } = require('../controllers/teacherController');
const auth = require('../middleware/authMiddleware');

router.post('/add', auth, addTeacher);
router.get('/', auth, getAllTeachers);
router.delete('/:id', auth, deleteTeacher);
router.put('/:id', auth, updateTeacher);

module.exports = router;
