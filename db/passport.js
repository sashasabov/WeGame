const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/users')
const bcrypt = require('bcrypt')

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
},
function(accessToken, refreshToken, profile, cb){
    User.findOne({'googleId': profile.id}, function(err,user){
        if(err) return cb(err);
        if (user){
            return cb(null, user);
        }else{
            const newUser = new User({
                name: profile.displayName,
                email:profile.emails[0].value,
                googleId: profile.id
            });
            newUser.save(function(err){
                if (err) return cb(err);
                return cb(null, newUser)
            });
        }
    });
}));


passport.use(new LocalStrategy({ usernameField: "email", passwordField: "password" },
     function(email, password, done) {
      User.findOne({ email: email}, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false, {message:'invalid user'}); }
        bcrypt.compare(password, user.password, (err, isMatch)=>{
            if(err || !isMatch){
                return done(null, false, {message:"Incorrect credentials"});
            }
            return done(null, user);
        })
    });
    }
  ));


passport.serializeUser(function(user, done){
    done(null, user.id);
});

passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        done(err, user);
    });
});



