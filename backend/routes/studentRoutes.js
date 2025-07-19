const express = require('express');
const router = express.Router();
const { addStudent, getStudentsByClass, deleteStudent, updateStudent } = require('../controllers/studentController');
const auth = require('../middleware/authMiddleware');

router.post('/add', auth, addStudent);
router.get('/class/:classId', auth, getStudentsByClass);
router.delete('/:id', auth, deleteStudent);
router.put('/:id', auth, updateStudent);

module.exports = router;
