/** 
  * main index file to  start the app
  *
  **/

var express =   require("express");
var app         =   express();
var request = require('request');
var router = require('./router/router.js');

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'example.com');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(allowCrossDomain);

app.use('/',router);

app.listen(4507,function(){
    console.log("App Started on port 4507");
});


