var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
//  res.send('this is the home page');
  res.render('home/home')
});

module.exports = router;
