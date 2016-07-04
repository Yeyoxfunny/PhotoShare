var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
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
        user.save(function(err, doc) {
            if (err) {
                return done(null, false, { message: String(err) });
            }
            return done(null, user);
        });
    }
));

passport.use('loginStrategy', new LocalStrategy(
    function(username, password, done) {
        User.findOne({
            username: username
        }, function(err, doc) {
            if (err) {
                return done(err);
            }
            return done(null, doc);
        });
    }
));

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

module.exports = passport;
