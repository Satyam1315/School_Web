const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  name: { type: String, required: true },   // e.g., "Grade 1"
  section: { type: String, required: true }, // e.g., "A"
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' }, // optional initially
  roomNumber: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Class', classSchema);
