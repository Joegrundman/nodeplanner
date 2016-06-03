var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var mongoose = require('mongoose')
var User = mongoose.model('User')

passport.use(new LocalStrategy(
    function(email, password, done) {
        User.findOne({ email: email }, function(err, user) {
            if(err) { return done(err) }
            if(!user) {
                return done(null, false), { message: 'This email does not match any of our users.' }
            }
            if (!user.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' })
            }
            return done(null, user)
        })
    }
))