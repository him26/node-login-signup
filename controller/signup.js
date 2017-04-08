var express = require('express'),
router = express.Router(),
signupClass = require('../model/signup');
signup = new signupClass();
router.post('/signup', function(req,res){
	console.log("Inside get signup");
	try
	{
		var signupalreadyregister = function (err,success) {
			res.send([{"status":false,"msg":"already register"}]);
		};

		var signupcompletedregister = function(err,success) {
			res.send([{"status":true,"msg":"signup Successfully"}]);
		}
		console.log("request data is ",req.body);
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
			res.send([{"status":false,"msg":"Please insert data correctly.."}]);
		}
		else
		{
			req.checkBody("email", "Enter a valid email address.").isEmail();
			req.checkBody("createPass", "Enter a valid create password").optional().matches(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z]*[A-Z])(?=.*[@#$%&_]).*$/);
			req.checkBody("confirmPass", "Enter a valid confirm password").optional().matches(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z]*[A-Z])(?=.*[@#$%&_]).*$/);
			req.checkBody("mob", "Enter a valid mob").optional().matches(/^([7-9]{1}[0-9]{9})$/);

			var errors = req.validationErrors();
			if (errors) {
				console.log("errors are...",errors);
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
		res.send([{"status":false,"message":"server error"}]);
	}
});
module.exports = router;
