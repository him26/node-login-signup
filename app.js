var express      =  require("express"),
    app          =  express();
    bodyParser   =  require("body-parser");
  var cors = require('cors');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(require('./controller/index.js'));

var port = 8081;
app.listen(port,function () {
  // connect();
  console.log("listning from the port" +port);
});
