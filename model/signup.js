
var	firebase = require('../config.js'),
	usersRef = firebase.database().ref("users");

var signup = function() {

		};

signup.prototype.saveUser= function(data){
		// var email = data.email;
		console.log(email);
			usersRef.push(data);
}
module.exports = signup;
