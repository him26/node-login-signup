var express = require('express'),
router = express.Router(),
loginClass=require('../model/login'),
login =new loginClass();
router.post('/login', function(req,res){
	try
	{
	var loginsuccess = function (err,success) {
		if(!err)
		{
			console.log(success);
			req.session = success;
			res.send([{"status":true,"msg":"Successfully login","session":true}]);
		}
		else
		{
			res.send([{"status":false,"msg":"UnSuccessfully login","session":false}]);
		}
	};
	var loginData = {
		email : req.body.email,
		password : req.body.password,
	}
	console.log(req.body);
	if (!login.isValidate(loginData))
	{
		res.send([{"status":false,"msg":"validation error"}]);
	}
	else
	{
		req.checkBody("email", "Enter a valid email address.").isEmail();
		req.checkBody("password", "Enter a valid password").optional().matches(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z]*[A-Z])(?=.*[@#$%&_]).*$/);
		var errors = req.validationErrors();
		console.log(errors);
		if (errors) {
			res.send(errors);
			return;
		}
		login.checklogin(loginData);
		login.once("loginsuccess",loginsuccess);
	}
	res.once("finish",function () {
		console.log("finish");
		login.removeListener("loginsuccess", loginsuccess);
	});
	res.once("end",function () {
		console.log("end");
		login.removeListener("loginsuccess", loginsuccess);
	});
}
catch (e)
{
	console.log(e);
	res.send([{"status":false,"msg":"server error"}]);
}

});
module.exports = router;
