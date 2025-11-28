const Student = require('../models/student');
const Class = require('../models/Class');

// Add Student
exports.addStudent = async (req, res) => {
  try {
    const { name, rollNo, classId, email, dob, address, phone, gender } = req.body;

    // Check if classId exists
    const classExists = await Class.findById(classId);
    if (!classExists) {
      return res.status(400).json({ errors: [{ msg: 'Class not found' }] });
    }

    const newStudent = new Student({ name, rollNo, classId, email, dob, address, phone, gender });
    await newStudent.save();

    res.status(201).json({ message: 'Student added successfully', student: newStudent });
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate rollNo
      return res.status(400).json({ errors: [{ msg: 'Roll number already exists' }] });
    }
    res.status(500).json({ errors: [{ msg: error.message }] });
  }
};

// Get Students (class-wise)
exports.getStudentsByClass = async (req, res) => {
  try {
    const { classId } = req.params;
    const students = await Student.find({ classId }).populate('classId');
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: error.message }] });
  }
};

// Delete Student
exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Student.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Student
exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;
    const updated = await Student.findByIdAndUpdate(id, update, { new: true });
    if (!updated) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json({ message: 'Student updated successfully', student: updated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
