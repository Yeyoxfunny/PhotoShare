
module.exports = function (passport) {
  var express = require('express');
  var router = express.Router();

  var _ = require('lodash');
  var UserModel = require('../models/User');

  /* GET home page. */
  router.get('/', function(req, res) {
    res.render('index', { title: 'PhotoShare' });
  });

  router.get('/login',function (req, res) {
    res.render('login', { title: 'Login' });
  });

  router.get('/signin',function (req, res) {
    res.render('signin', { title: 'Sign In', message: req.flash('error') });
  });

  router.post('/users',passport.authenticate('registerUser', {
      failureRedirect: '/signin',
      failureFlash: true,
      successRedirect: '/app'
    })
  );

  return router;
}
