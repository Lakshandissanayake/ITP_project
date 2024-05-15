const asyncHandler = require("express-async-handler");
const Reservation = require("../modules/reservationModel");
const mongoose = require("mongoose");

// Create a new reservation
const createReservation = asyncHandler(async (req, res) => {
	const {
		parentName,
		phoneNumber,
		petName,
		petBreed,
		symptomsAndOtherNotes,
		reservedDoctor,
		reservationDate,
		reservationTime,
	} = req.body;

	const existingReservation = await Reservation.findOne({
		reservedDoctor: reservedDoctor,
		reservationDate: reservationDate,
		reservationTime: reservationTime,
	});

	if (existingReservation) {
		return res.status(400).json({
			message: "A reservation already exists for the same doctor, date, and time.",
		});
	}

	const reservation = await Reservation.create({
		parentName,
    phoneNumber,
    petName,
    petBreed,
    symptomsAndOtherNotes,
    reservedDoctor,
    reservationDate,
    reservationTime
	});

	if (reservation) {
		res.status(201).json({
			_id: reservation._id,
			parentName: reservation.parentName,
			phoneNumber: reservation.phoneNumber,
			petName: reservation.petName,
			petBreed: reservation.petBreed,
			symptomsAndOtherNotes: reservation.symptomsAndOtherNotes,
			reservedDoctor: reservation.reservedDoctor,
			reservationDate: reservation.reservationDate,
			reservationTime: reservation.reservationTime,
		});
	} else {
		res.status(400);
		throw new Error("Invalid reservation data");
	}
});

// Get all reservations
const getAllReservations = asyncHandler(async (req, res) => {
	const reservations = await Reservation.find({});
	res.json(reservations);
});

// Get reservation by parent name
const getReservationsByParentName = asyncHandler(async (req, res) => {
	const parentName = req.params.parentName;
	const reservations = await Reservation.find({ parentName: parentName });
	res.json(reservations);
});

// Get reservations by doctor name
const getReservationsByDoctorName = asyncHandler(async (req, res) => {
	const reservedDoctor = req.params.reservedDoctor;
	const reservations = await Reservation.find({ reservedDoctor: reservedDoctor });
	res.json(reservations);
});

// Get reservations by date
const getReservationsByDate = asyncHandler(async (req, res) => {
	const reservationDate = req.params.reservationDate;
	const reservations = await Reservation.find({ reservationDate: reservationDate });
	res.json(reservations);
});

// Get reservations by time
const getReservationsByTime = asyncHandler(async (req, res) => {
	const reservationTime = req.params.reservationTime;
	const reservations = await Reservation.find({ reservationTime: reservationTime });
	res.json(reservations);
});

// Get Reservations by petName
const getReservationsByPetName = asyncHandler(async (req, res) => {
	const petName = req.params.petName;
	const reservations = await Reservation.find({ petName: petName });
	res.json(reservations);
});

// Get reservation by id
const getReservationById = asyncHandler(async (req, res) => {
	const reservation = await Reservation.findById(req.params.id);
	if (reservation) {
		res.json(reservation);
	} else {
		res.status(404);
		throw new Error("Reservation not found");
	}
});

// Update reservation by id
const updateReservationById = asyncHandler(async (req, res) => {
	const reservation = await Reservation.findById(req.params.id);
	if (reservation) {
		reservation.parentName = req.body.parentName || reservation.parentName;
		reservation.phoneNumber = req.body.phoneNumber || reservation.phoneNumber;
		reservation.petName = req.body.petName || reservation.petName;
		reservation.petBreed = req.body.petBreed || reservation.petBreed;
		reservation.symptomsAndOtherNotes = req.body.symptomsAndOtherNotes || reservation.symptomsAndOtherNotes;
		reservation.reservedDoctor = req.body.reservedDoctor || reservation.reservedDoctor;
		reservation.reservationDate = req.body.reservationDate || reservation.reservationDate;
		reservation.reservationTime = req.body.reservationTime || reservation.reservationTime;

		const updatedReservation = await reservation.save();
		res.json(updatedReservation);
	} else {
		res.status(404);
		throw new Error("Reservation not found");
	}
});

// Delete reservation by id
const deleteReservationById = asyncHandler(async (req, res) => {
	const reservation = await Reservation.findByIdAndDelete(req.params.id);
	if (reservation) {
		res.json({ message: "Reservation removed" });
	} else {
		res.status(404);
		throw new Error("Reservation not found");
	}
});

module.exports = {
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
};
