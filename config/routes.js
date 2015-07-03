var appointments = require('../server/controllers/appointments.js');
module.exports = function(app){
	app.get('/appointments', function(req, res){
		appointments.show(req, res);
	})
	app.post('/newappointment', function(req, res){
		appointments.add(req, res);
	})
	app.get('/cancel/:id', function(req, res){
		console.log('in the routing of cancel');
		appointments.remove(req, res);
	})
}