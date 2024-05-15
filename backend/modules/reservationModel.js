const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reservationSchema = new Schema({
	parentName: { 
		type: String, 
		required: true 
	},
	phoneNumber: { 
		type: String, 
		required: true 
	},
	petName: { 
		type: String, 
		required: true 
	},
	petBreed: { 
		type: String, 
		required: true 
	},
	symptomsAndOtherNotes: { 
		type: String, 
		required: true 
	},
	reservedDoctor: { 
		type: String, 
		default: "active" 
	},
	reservationDate: { 
		type: Date, 
		default: Date.now,
		required: true,
	},
	reservationTime: { 
		type: String, 
		required: true,
	},
});

const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = Reservation;
