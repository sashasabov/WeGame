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



//   passport.use(new LocalStrategy({ usernameField: "email", passwordField: "password" }, 
//   function(email, password, done) {
//     email = email.toLowerCase();
//     User.findOne({email: email}, {}, async function(err, user) {
//      if(err){return done(err, null);}
    
//     //  console.log(bcrypt.compare(password, user.password))
//      if( await bcrypt.compare(password, user.password)){
//         console.log(password)
//         console.log(user.password) 
//         console.log(bcrypt.compare(password, user.password))
//         return done(null, user)}
//      else{done(null, false, {message:"Password is incorrect"})}
//         return done(null, user);
//     });
//    }));

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

// passport.use(new LocalStrategy({ usernameField: "email" }, function(email, password, done) {
//     User.findOne({ email: email }, {}, function(err, user) {
//       if (err) { return done(err); }
//       if (!user) { return done(null, false, { message: 'Unknown user ' + e }); }
//       user.comparePassword(password, function(err, isMatch) {
//         if (err) return done(err);
//         if(isMatch) {
//           return done(null, user);
//         } else {
//           return done(null, false, { message: 'Invalid password' });    

//         }
//       });
//     });
//   }));






// passport.use(new LocalStrategy(
//     {
//     usernameField: 'user[email]',
//     passwordField: 'user[password]'
//    }, 
//    function(email, password, done) {
//     User.findOne({email: email}).then(function(user){
//      if(!user || !user.validPassword(password)){
//       return done(null, false, {errors: {'email or password': 'is invalid'}});
//      }
   
//      return done(null, user);
//     }).catch(done);
//    }));

// passport.use(new LocalStrategy(function verify(email, password, cb) {
//     User.findOne({ email: email}, function (err, row) {
//       if (err) { return cb(err); }
//       if (!row) { return cb(null, false, { message: 'Incorrect username or password.' }); }
      
//       crypto.pbkdf2(password, row.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
//         if (err) { return cb(err); }
//         if (!crypto.timingSafeEqual(row.hashed_password, hashedPassword)) {
//           return cb(null, false, { message: 'Incorrect username or password.' });
//         }
//         return cb(null, row);
//       });
//     });
//   }));


passport.serializeUser(function(user, done){
    done(null, user.id);
});

passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        done(err, user);
    });
});



