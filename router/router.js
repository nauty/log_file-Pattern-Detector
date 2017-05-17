/**
  * file containing route methods
  *
  **/
	
var express = require('express');
var router =  express.Router();
var controller = require('../controller/uploader.js');

router.get('/', controller.launchUI);
router.post('/log_file/upload',controller.uploadFile);



module.exports = router;