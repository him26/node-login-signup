console.log("config file");
var firebase = require('firebase');
var config = {
    apiKey: "AIzaSyCX68YagTjYgkXh-f0Ss3ZdTho9s9vr1ZY",
    authDomain: "loginsignupproject.firebaseapp.com",
    databaseURL: "https://loginsignupproject.firebaseio.com",
    projectId: "loginsignupproject",
    storageBucket: "loginsignupproject.appspot.com",
    messagingSenderId: "618000679985"
  };
var firebase= firebase.initializeApp(config);
module.exports = firebase;
