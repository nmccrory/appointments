var mongoose = require('mongoose');
var AppointmentSchema = new mongoose.Schema({
	name: String,
	complain: String,
	scheduled_time: Date,
	scheduled_date: Date
});

mongoose.model('Appointment', AppointmentSchema);