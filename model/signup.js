var	firebase = require('../config.js'),
 usersRef = firebase.database().ref();
 var EventEmitter = require('events').EventEmitter;
 var util = require('util');

	var signup = function() {
			var self = this;
			EventEmitter.call(this);
		};
		util.inherits(signup, EventEmitter);
		var signupEvent = new signup();

		signup.prototype.isValidate = function (signupdata) {
		        console.log("I am in isValidate Method");
						var fname = signupdata.fname;
						var lname = signupdata.lname;
		        var email = signupdata.email;
		        var password = signupdata.password;
						var mobno = signupdata.mobno;
		        if (fname == "" || lname == "" || email == "" || password == "" || mobno == "") {
		            if (fname == "" && lname == "" && email == "" && password == "" && mobno == "") {
										// console.log("line1");
										return false ;
		            }
		            if (fname == "") {
									// console.log("line2");
		                return false ;
		            } else if(lname == "") {
									// console.log("line3");
		                return false ;
		            } else if(email == "") {
									// console.log("line4");
										return false ;
								} else if(password == "") {
									return false;
								}
								else if(mobno == "") {
									// console.log("line5");
										return false;
								}
		        } else if (fname == undefined || lname == undefined || email == undefined || password == undefined || mobno == undefined) {
		            if (fname == undefined && lname == undefined && email == undefined && password == undefined && mobno == undefined) {
		                  return false;
		              }
									if (fname == undefined) {
			                return false ;
			            } else if(lname == undefined) {
			                return false ;
			            } else if(email == undefined) {
											return false ;
									} else if(mobno == undefined) {
											return false;
									}
		            return false;
		      }
		      return true;
		}


signup.prototype.saveUser = function(data){

	ref.orderByChild("email").equalTo(data.email).once("value", function(data) {
		data.forEach(function(snap) {
			  signupEvent.emit("signupalreadyregister","email already in use");
		});
	});
	ref.push();
	ref.once("value", function(data) {
			console.log("signup completed");
			signupEvent.emit("signupcompletedregister","registration Successfull");

			// response.send({
			// 		"status": true,
			// 		"message": "registration Successfull"
			// });
	});
};
module.exports = signupEvent;
