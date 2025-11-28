const express = require('express');
const router = express.Router();
const { addFacility, getAllFacilities, deleteFacility, updateFacility } = require('../controllers/facilityController');
const auth = require('../middleware/authMiddleware');

router.post('/add', auth, addFacility);
router.get('/', auth, getAllFacilities);
router.delete('/:id', auth, deleteFacility);
router.put('/:id', auth, updateFacility);

module.exports = router;
