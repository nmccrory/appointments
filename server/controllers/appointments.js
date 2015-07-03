var mongoose = require('mongoose');
var Appointment = mongoose.model('Appointment');
module.exports = (function(){
	return{
		show: function(req, res){
			var d = new Date();
			var datey = d.setDate(d.getDate() - 1);
			console.log('in the controller');
			Appointment.find({scheduled_date: {$gte: datey}}, function(err, appts){
				if(err){
					console.log('error fetching appointments');
				}else{
					res.json(appts);
				}
			})
		},
		add: function(req, res){
			console.log('in the add controller');
			var appointment = new Appointment({name: req.body.name, complain: req.body.complain, scheduled_time: req.body.scheduled_time, scheduled_date:req.body.scheduled_date });
			appointment.save(function(err){
				if(err){
					console.log('unable to add appt');
				}else{
					console.log('appt creation successful');
					res.redirect('/appointments');
				}
			})
		},
		remove: function(req, res){
			Appointment.remove({_id: req.params.id}, function(err, appt){
				if(err){
					console.log('unable to delete');
				}else{
					console.log('deleted appt');
					res.redirect('/appointments');
				}
			})
		}
	}
})();