var express      =  require("express"),
    app          =  express();
    bodyParser   =  require("body-parser"),

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require('./controller/index.js'));

var port = 8081;
app.listen(port,function () {
  // connect();
  console.log("listning from the port" +port);
});
