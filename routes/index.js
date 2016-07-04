var express = require('express');
var router = express.Router();

var UserModel = require('../models/User');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'PhotoShare' });
});

router.get('/login',function (req, res) {
  res.render('login', { title: 'Login' });
});

router.get('/signin',function (req, res) {
  UserModel.find(function(err, doc) {
    res.render('signin', { title: 'Sign In' });
  });
});

router.post('/users',function (req, res) {
  var user = new UserModel({
    name: req.body.name,
    lastname: req.body.lastname,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    passwordConfirmation: req.body.passwordConfirmation,
    birthdate: req.body.birthdate,
    gender: req.body.gender
  });

  user.save(function (err, doc) {
    if(err){
      req.flash('info',String(err));
      return res.redirect('/signin');
    }
    res.redirect('/signin');
  });
});


module.exports = router;
