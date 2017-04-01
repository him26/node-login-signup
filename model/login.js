var	firebase = require('../config.js'),
   ref = firebase.database().ref();

var login = function() {

		};

login.prototype.checklogin= function(data){
  ref.on("child_added", function(snapshot) {
    var userobj = snapshot.val();
    var userkey = snapshot.key;
   console.log(typeof(userobj));
   console.log(userkey);
  }, function (error) {
   console.log("Error: " + error.code);
  });
}
module.exports = login;
