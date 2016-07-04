
module.exports = function (passport) {
  var express = require('express');
  var router = express.Router();

  var UserModel = require('../models/User');

  /* GET home page. */
  router.get('/', function(req, res) {
    res.render('index', { title: 'PhotoShare' });
  });

  router.get('/login',function (req, res) {
    if(req.user){
      return res.redirect('/app');
    }
    res.render('login', { title: 'Login', message: req.flash('error') });
  });

  router.get('/signin',function (req, res) {
    if(req.user){
      return res.redirect('/app');
    }
    res.render('signin', { title: 'Sign In', message: req.flash('error') });
  });

  router.post('/session', passport.authenticate('loginStrategy', {
      failureRedirect: '/login',
      failureFlash: true,
      successRedirect: '/app'
    })
  );

  router.post('/users',passport.authenticate('registerUser', {
      failureRedirect: '/signin',
      failureFlash: true,
      successRedirect: '/app'
    })
  );

  return router;
}
