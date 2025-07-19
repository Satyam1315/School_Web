const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subject: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  address: { type: String },
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  dob: { type: Date },
  qualification: { type: String },
  classesAssigned: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class' }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Teacher', teacherSchema);
