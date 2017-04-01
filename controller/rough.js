// Initialize Firebase
var firebase=require("firebase");
var Regex = require("regex");
var regex = new Regex('/^[A-Za-z]+$/');
var config=require("./config");
firebase.initializeApp(config);
// firebase.initializeApp({
//   //serviceAccount:"login-526cf06f01e8.json"
//   databaseURL:"https://login-bbfa2.firebaseio.com/"
// });
//app.use("config.js");
var ref = firebase.database().ref();
// ref.on("value", function(snapshot)
// {
//   snapshot.forEach(function (value) {
//     console.log(value.key);
//     //console.log(value.value);
//       var abc=value.val();
//   console.log("name is "+abc.name);
//   console.log("password is"+abc.password);
//   //console.log(snapshot.val());
//  //console.log(snapshot.key);
//  });
// });
var express=require("express");   //Http  server but framework  node js i will create http server (web services,REST API)
var app=express();
var port =8086;
var bodyParser = require("body-parser");
app.use(bodyParser.json())
app.post("/login",function(request,response){
  try
  {
  var email = request.body.email;
  var password = request.body.password;
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  console.log(error.code);
  console.log(error.message);
  console.log("login unsucessful");
});
  response.send({"status":true,"message":"user Login Successfull"})
}catch(e)
{
  response.send({"status":false,"message":"SERVER ERROR"});
}
});

app.post("/signup",function (request,response) {
try {
console.log(request.body.email);
if(request.body.email===undefined || request.body.password===undefined)
{
  response.send({"status":false,"message":"signup error"});

}else {
  // ref.child(request.body.username).set({
  //   name:request.body.username,
  //   password:request.body.password
  //     });
  var email = request.body.email;
var password = request.body.password;
console.log(email);
console.log(password);
firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
   console.log(error.code);
   console.log(error.message);
  // response.send({"status":true,"message":"registration unsucessful"});
  console.log("invalid user");
});
    response.send({"status":true,"message":"registration Successfull"});
}
} catch (e) {
    response.send({"status":false,"message":"SERVER ERROR"});
}
});
var server=app.listen(port,function()
{
  console.log("server port %d has started",port);
})
