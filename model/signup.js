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
		        var createPass = signupdata.createPass;
            var confirmPass = signupdata.confirmPass;
						var mob = signupdata.mob;
		        if (fname == "" || lname == "" || email == "" || createPass == "" || confirmPass =="" || mob == "") {
		            if (fname == "" && lname == "" && email == "" && createPass == "" && confirmPass =="" && mob == "") {
										return false ;
		            }
		            if (fname == "") {
		                return false ;
		            } else if(lname == "") {
		                return false ;
		            } else if(email == "") {
										return false ;
								} else if(createPass == "") {
									return false;
								}else if(confirmPass == "") {
									return false;
								}
								else if(mob == "") {
										return false;
								}
		        } else if (fname == undefined || lname == undefined || email == undefined || createPass == undefined || confirmPass == undefined || mob == undefined) {
		            if (fname == undefined && lname == undefined && email == undefined && createPass == undefined && confirmPass == undefined && mob == undefined) {
		                  return false;
		              }
									if (fname == undefined) {
			                return false ;
			            } else if(lname == undefined) {
			                return false ;
			            } else if(email == undefined) {
											return false ;
									} else if(createPass == undefined) {
  									return false;
  								}else if(confirmPass == undefined) {
  									return false;
  								}else if(mob == undefined) {
											return false;
									}
		            return false;
		      }
		      return true;
		}


signup.prototype.saveUser = function(bodydata){

  usersRef.orderByChild("email").equalTo(bodydata.email).once("value", function(data) {
        if(data.val()!==null)
        {
            data.forEach(function(snap) {
                console.log("already user");
                signupEvent.emit("signup1","email already in use");
            });
        }
        else
        {
          console.log(bodydata);
          usersRef.push().setWithPriority(bodydata, 0 - Date.now());
          usersRef.once("value", function(data) {
          console.log("signup completed");
          signupEvent.emit("signup2","regiter Successfully");
          });
        }
});
}



module.exports = signupEvent;
