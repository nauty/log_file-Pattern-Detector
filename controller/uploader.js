/**
  * file containg methods invoked on routes
  *
  **/

  /**
  * log Pattern : HTTP_METHOD HEADER COUNTRY_CODE URL DATE
  *  Pattern Hardcoded :1)-> If HEADER = 'MATLAB', 2)-> If COUNTRY_CODE is not India
  **/

var express =   require("express");
var multer  =   require('multer');
var request =   require('request');
var fs =        require('fs');

var data =  require('../data/data.json');

module.exports = {
	

 launchUI : function(req,res,next){
 return  res.sendFile(__dirname + "/index.html");
 },

 uploadFile: function(req,res,next) {
  var storage =   multer.diskStorage({
  	destination: function (req, file, cb) {
       cb(null, '././uploads');
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname); 
    }
 });

var upload = multer({ storage : storage}).single('logFile');

upload(req,res,function(err) {
        if(err) {
          console.log("err",err);
           return res.end("Error uploading file.");
        }
     var filePath = '././uploads/logFile';
     validateFile(res,filePath)
     .then((result)=>{   
        console.log("done");
        return res.end("File is checked");
      });  
    }); 

 }
}//eof exports


function validateFile(res,filePath){
 return new Promise(function(resolve,reject){
   var lineReader = require('readline').createInterface({
       input: require('fs').createReadStream(filePath)
    });

  lineReader.on('line', function (line) {
    if(line) validateLine(res,line);
  }); 
 
  lineReader.on('close', function () {
    fs.unlinkSync(filePath);
    return resolve();
  }); 
 });
}  

function validateLine(res,line) {
  var lineData = line.split(" ");
     if(lineData[1]==='MATLAB'|| data[lineData[2]]!=="IN") 
      res.write("Yes, "+line+'\n'); 
     else  res.write("No, "+line+'\n');   
 
}
