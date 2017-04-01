var express = require('express'),
	app = express(),
	router = express.Router(),
	loginClass = require('../model/login');
	login = new loginClass();
  router.post('/login', function(req,res){
		// try
		// {
			if (req.body.email === undefined || req.body.password === undefined)
			{
				res.send({"status":false,"message":"signup error"});
			}
			else
			{
				var loginData = {
					email : req.body.email,
					password : req.body.password,
				}
				login.checklogin(loginData);
				res.send({"status":true,"message":"Successfully Signup"});
			}
		// }
		// catch (e)
		// {
		// 		console.log(e);
		// 		res.send({"status":false,"message":"server error"});
		// }
	});
module.exports = router;
