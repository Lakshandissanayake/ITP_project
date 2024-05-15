const express = require('express');
const router = express.Router();
const {
  createReservation,
  getAllReservations,
  getReservationById,
  updateReservationById,
  deleteReservationById,
  getReservationsByParentName,
  getReservationsByDoctorName,
  getReservationsByDate,
  getReservationsByTime,
  getReservationsByPetName
} = require('../Controllers/reservationController');

// Create reservation
router.post('/create', createReservation);

// Get all reservation
router.get('/getAll', getAllReservations);

// Get reservation by ID
router.get('/:id', getReservationById);

// Update reservation by ID
router.put('/:id', updateReservationById);

// Delete reservation by ID
router.delete('/:id', deleteReservationById);

// Get reservation by parent name
router.get('/parent/:parentName', getReservationsByParentName);

// Get reservation by doctor name
router.get('/doctor/:reservedDoctor', getReservationsByDoctorName);

// Get reservation by date
router.get('/date/:reservationDate', getReservationsByDate);

// Get reservation by time
router.get('/time/:reservationTime', getReservationsByTime);

// Get reservation by pet name
router.get('/pet/:petName', getReservationsByPetName);

module.exports = router;
