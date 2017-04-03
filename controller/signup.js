var express = require('express'),
	app = express(),
	router = express.Router(),
	signup = require('../model/signup'),
  // signup = new signupClass();
  // console.log("signup",signup);
  router.post('/signup', function(req,res){
  console.log("Inside get signup");
    try
    {
			var signupalreadyregister = function (err,success) {
					res.send({"status":true,"message":"already register"});
			};

			var signupcompletedregister = function(err,success) {
				res.send({"status":true,"message":"signup Successfully"});

			}
			var data = {
										fname : req.body.fname,
										lname : req.body.lname,
										email : req.body.email,
										password : req.body.password,
										mobno : req.body.mobno,
									};
        if(!signup.isValidate(data))
        {
          res.send({"status":false,"message":"signup error"});
        }
        else
        {
        	signup.saveUser(data);
          	signup.once("signupalreadyregister",signupalreadyregister);
						signup.once("signupcompletedregister",signupcompletedregister);
        }
    }
    catch (e)
    {
      console.log(e);
        res.send({"status":false,"message":"server error"});
    }
	});
module.exports = router;
