const Class = require('../models/Class');

// Add Class
exports.addClass = async (req, res) => {
  try {
    const { name, section, teacherId, roomNumber } = req.body;
    const newClass = new Class({ name, section, teacherId, roomNumber });
    await newClass.save();

    res.status(201).json({ message: 'Class added successfully', classData: newClass });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Classes
exports.getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find().populate('teacherId');
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Class
exports.deleteClass = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Class.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Class not found' });
    }
    res.status(200).json({ message: 'Class deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Class
exports.updateClass = async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;
    const updated = await Class.findByIdAndUpdate(id, update, { new: true });
    if (!updated) {
      return res.status(404).json({ message: 'Class not found' });
    }
    res.status(200).json({ message: 'Class updated successfully', classData: updated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
