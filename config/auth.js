var passport = require('passport');
var LocalStrategy = require('passport-local');
var User = require('../models/User');

passport.use('registerUser', new LocalStrategy({
        passReqToCallback: true
    },
    function(req, username, password, done) {
        var user = new User({
            name: req.body.name,
            lastname: req.body.lastname,
            username: username,
            email: req.body.email,
            password: password,
            passwordConfirmation: req.body.passwordConfirmation,
            birthdate: req.body.birthdate,
            gender: req.body.gender
        });

    }
));
