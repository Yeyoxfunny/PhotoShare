var express = require('express');
var router = express.Router();
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('app/home',{ title: 'Home user', user: req.user});
});

module.exports = router;
