module.exports = function (passport) {

  var express = require('express');
  var router = express.Router();
  /* GET users listing. */
  router.get('/', function(req, res, next) {
    res.render('app/home',{ title: 'Home user', user: req.user});
  });

  router.get('/logout', function(req, res, next) {
    req.session.destroy(function (err) {
      if(err){
        return nex(err);
      }
      res.redirect('/login'); //Inside a callback… bulletproof!
    });
  });

  return router;
}
