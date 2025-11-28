const Teacher = require('../models/Teacher');

// Add Teacher
exports.addTeacher = async (req, res) => {
  try {
    const { name, subject, email, phone, address, gender, dob, qualification, classesAssigned } = req.body;
    const newTeacher = new Teacher({ name, subject, email, phone, address, gender, dob, qualification, classesAssigned });
    await newTeacher.save();

    res.status(201).json({ message: 'Teacher added successfully', teacher: newTeacher });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Teachers
exports.getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find().populate('classesAssigned');
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Teacher
exports.deleteTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Teacher.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.status(200).json({ message: 'Teacher deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Teacher
exports.updateTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;
    const updated = await Teacher.findByIdAndUpdate(id, update, { new: true });
    if (!updated) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.status(200).json({ message: 'Teacher updated successfully', teacher: updated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
