var express = require('express'),
	app = express(),
	router = express.Router(),
	signup = require('../model/signup');
	var validator = require('express-validator');

	router.use(validator());
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
										createPass : req.body.createPass,
										confirmPass : req.body.confirmPass,
										mob : req.body.mob,
									};
									console.log("data",data);
									console.log(signup.isValidate(data));
        if(!signup.isValidate(data))
        {
          res.send({"status":false,"message":"signup error"});
        }
        else
        {
					req.checkBody("email", "Enter a valid email address.").isEmail();
					req.checkBody("createPass", "Enter a valid password").optional().matches(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z]*[A-Z])(?=.*[@#$%&_]).*$/);
					req.checkBody("confirmPass", "Enter a valid password").optional().matches(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z]*[A-Z])(?=.*[@#$%&_]).*$/);
					req.checkBody("mob", "Enter a valid mob").optional().matches(/^([7-9]{1}[0-9]{9})$/);

					var errors = req.validationErrors();
					console.log(errors);
					if (errors) {
							res.send(errors);
							return;
					}
        	signup.saveUser(data);
					signup.once("signup1",signupalreadyregister);
					signup.once("signup2",signupcompletedregister);

        }
				res.on("finish",function () {
							console.log("finish");
						 signup.removeListener("signup1", signupalreadyregister);
						 signup.removeListener("signup2", signupcompletedregister);

				});
				res.once("end",function () {
						console.log("end");
						signup.removeListener("signup1", signupalreadyregister);
						signup.removeListener("signup2", signupcompletedregister);
				});
    }
    catch (e)
    {
      console.log(e);
        res.send({"status":false,"message":"server error"});
    }
	});
module.exports = router;


// var signupmsg = function (err,success) {
// 	console.log(err)
// 	console.log(success);;
// 	if(!err)
// 	{
// 		res.send({"status":true,"message":"Successfully signup"});
// 	}
// 	else
// 	{
// 		res.send({"status":false,"message":"UnSuccessfully signup"});
// 	}
// };
