const Facility = require('../models/Facility');

// Add Facility
exports.addFacility = async (req, res) => {
  try {
    const { name, description, image, location, capacity, inCharge } = req.body;
    const newFacility = new Facility({ name, description, image, location, capacity, inCharge });
    await newFacility.save();

    res.status(201).json({ message: 'Facility added successfully', facility: newFacility });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Facilities
exports.getAllFacilities = async (req, res) => {
  try {
    const facilities = await Facility.find();
    res.status(200).json(facilities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Facility
exports.deleteFacility = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Facility.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Facility not found' });
    }
    res.status(200).json({ message: 'Facility deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Facility
exports.updateFacility = async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;
    const updated = await Facility.findByIdAndUpdate(id, update, { new: true });
    if (!updated) {
      return res.status(404).json({ message: 'Facility not found' });
    }
    res.status(200).json({ message: 'Facility updated successfully', facility: updated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
