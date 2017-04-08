var	firebase = require('../config.js'),
ref = firebase.database().ref();
var EventEmitter = require('events').EventEmitter;
var util = require('util');
var login = function() {
  var self = this;
  EventEmitter.call(this);
  this.checklogin = function(bodydata) {
    var email = bodydata.email;
    var password = bodydata.password;
    ref.orderByChild("email").equalTo(email).once("value", function(data) {
      if (data.val() !== null) {
        data.forEach(function(snap) {
          var temp = snap.val();
          if (temp.createPass === password) {
            console.log("valid password");
            self.emit("loginsuccess",null,temp);
          } else {
            console.log("invalid password");
            self.emit("loginsuccess","Invalid password",null);
          }
        });
      } else {
        console.log("invalid email");
        self.emit("loginsuccess","Invalid emailName",null);
      }
    });
  }
};

util.inherits(login, EventEmitter);
// var loginEvent = new login();

login.prototype.isValidate = function (loginEmailValidateData) {
  var email = loginEmailValidateData.email;
  var password = loginEmailValidateData.password;
  if (email == "" || password == "") {
    if (email == "" && password == "") {
      return false ;
    }
    if (email == "") {
      return false ;
    } else {
      return false ;
    }
  } else if (email == undefined || password == undefined) {
    if (email == undefined && password == undefined) {
      return false;
    }
    if (email == undefined) {
      return false ;
    } else {
      return false
    }
    return false;
  }
  return true;
}

module.exports = login;
