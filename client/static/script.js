var apptModule = angular.module('ApptApp', ['ngRoute']);
apptModule.config(function ($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl: 'partials/appointments.html'
	})
	.when('/appointments',{
		templateUrl: 'partials/appointments.html'
	})
	.when('/newappointment',{
		templateUrl: 'partials/newappointment.html'
	})
	.otherwise({
		redirectTo: '/'
	})
})
apptModule.factory('ApptFactory',function($http, $location){
	var appointments = [];
	var factory = {};
    factory.getAppointments = function(callback){
    	console.log('in the FActory');
    	$http.get('/appointments').success(function(output){
    		callback(output);
    	})
    }
    factory.addAppointment = function(info, callback){
    	$http.post('newappointment', info).success(function(){
    		$location.path('/');
    		callback();
    	})
    }
    factory.cancelAppointment = function(id, callback){
    	console.log('in factory method');
    	$http.get('/cancel/'+id).success(function(){
    		callback();
    	})
    }
	return factory;
})
apptModule.controller('appointmentsController', function(ApptFactory){
	var that = this;
	this.now = new Date().toISOString().substring(0,10);
	if(!user){
		var user = prompt("Please enter your name:", "Your name");
	}
	that.logged_user = user;

	this.getappointments = function(){
		ApptFactory.getAppointments(function(data){
			that.appointments = data;
		})
	}
	this.getappointments();

	this.addappointment = function(){
		that.errors = []; 
		that.newAppt.name = that.logged_user;
		var datecount = 0;
		for(x in that.appointments){
			if(that.appointments[x].scheduled_date == that.newAppt.scheduled_date.toISOString()){
				datecount++;
				if(datecount > 3){
					console.log('cannot add more than 3 appointments for that day');
					that.errors.push('Appointment date is full (No more than 3 appointments a day)')
				}
			}
			if(that.appointments[x].scheduled_date == that.newAppt.scheduled_date.toISOString() && that.appointments[x].name == that.newAppt.name){
				console.log('cannot have multiple appointments on one day');
				that.errors.push('Cannot schedule multiple appointments in one day')
			}
		}
		if(that.newAppt.complain.length < 10){
			console.log('textarea too short');
			that.errors.push('Complaint must be at least 10 characters in length')
		}
		if(that.newAppt.scheduled_time == null){
			that.errors.push('Please request a time')
		}
		if(that.errors.length > 0){
			return false;
		}else{
			ApptFactory.addAppointment(that.newAppt, function(){
				that.getappointments();
				that.newAppt = {};
			})
		}
		
	}
	this.cancelappointment = function(id){
		console.log('starting to cancel...');
		ApptFactory.cancelAppointment(id._id, function(){
			that.getappointments();
		})
	}
})