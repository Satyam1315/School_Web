const mongoose = require('mongoose');

const facilitySchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., Library, Sports Ground
  description: { type: String },
  image: { type: String }, // store image URL or path
  location: { type: String },
  capacity: { type: Number },
  inCharge: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Facility', facilitySchema);
