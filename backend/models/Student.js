const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollNo: { type: String, required: true, unique: true },
  classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
  email: { type: String },
  dob: { type: Date },
  address: { type: String },
  phone: { type: String },
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Student', studentSchema);
