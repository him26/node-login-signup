  var	firebase = require('../config.js'),
   ref = firebase.database().ref();
   var EventEmitter = require('events').EventEmitter;
   var util = require('util');
   var login = function() {
      var self = this;
      EventEmitter.call(this);
		};
    util.inherits(login, EventEmitter);
    var loginEvent = new login();


login.prototype.isValidate = function (loginEmailValidateData) {
        console.log("I am in isValidate Method");
        var email = loginEmailValidateData.email;
        var password = loginEmailValidateData.password;
        if (email == "" || password == "") {
            console.log("1 if");
            if (email == "" && password == "") {
                return false ;
            }
            if (email == "") {
                console.log("3 if");
                return false ;
            } else {
                console.log("4 if");
                return false ;
            }
        } else if (email == undefined || password == undefined) {
            console.log("else if");
            if (email == undefined && password == undefined) {
              console.log("1 if");
                  return false;
              }
            if (email == undefined) {
              console.log("2 if");
              return false ;
            } else {
              console.log("3 if");
            return false
            }
            return false;
      }
      return true;
}
login.prototype.checklogin = function(bodydata) {
     var email = bodydata.email;
     var password = bodydata.password;
     ref.orderByChild("email").equalTo(email).once("value", function(data) {
        if (data.val() !== null) {
            data.forEach(function(snap) {
                var temp = snap.val();
                if (temp.password === password) {
                    loginEvent.emit("loginsuccess",null,"you are online");
                } else {
                    loginEvent.emit("loginsuccess","Invalid password",null);
                }
            });
        } else {
          loginEvent.emit("loginsuccess","Invalid emailName",null);
        }
  });
}
module.exports = loginEvent;
