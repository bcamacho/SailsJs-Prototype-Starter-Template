
// Services are libraries which can be called from anywhere in the application.
// passport.use() finds the user by the given email and then compares the provided password to its hash using bcrypt (User.findOne() comes in-build with the Waterline ORM used by Sails.js).
// passport.serializeUser and passport.deserializeUser setup a login session.


var passport = require('passport'),
 LocalStrategy = require('passport-local').Strategy,
 bcrypt = require('bcrypt'),
 GoogleStrategy = require('passport-google-oauth20').Strategy;
 // FacebookStrategy = require('passport-facebook').Strategy;

var verifyGoogleHandler = function(accessToken, refreshToken, done, profile, cb) {
  console.log('accessToken = '+accessToken+'\nrefreshToken = '+refreshToken+'\ndone= '+done+'\nprofile= '+profile+'\ncb= '+cb);
  User.findOne({email: profile.emails[0].value}).exec(function(err, user){
    if(err) {
      console.log("Error, passport.js line: 17");
      return cb(err);
    }
    // If there is no local data that matches Google user data we will need to create a new user account
    if(!user) {
      var data = {
        provider: profile.provider,
        uid: profile.id,
        token: accessToken,
        name: profile.displayName,
        password: "letmein"+accessToken,
        role: "user"
        };
      if (profile.emails && profile.emails[0] && profile.emails[0].value) {
        data.email = profile.emails[0].value;
        }
      if (profile.name && profile.name.givenName) {
        data.firstname = profile.name.givenName;
        }
      if (profile.name && profile.name.familyName) {
        data.lastname = profile.name.familyName;
        }
      User.create(data, function(err, user) {
        console.log("User created and registered!\nUser --> "+user);
        return cb(err, user);
        });
      }
      else {
        console.log(user)
        return cb(err, user, {message:"authenticated with Google"});
      }
  });
}

var verifyLocalHandler = function(email, password, done) {
  User.findOne({ email: email }).exec(function(err, user) {
      if(err) { return done(err); }
      if(!user) { return done(null, false, { message: 'Unknown user ' + email }); }
      bcrypt.compare(password, user.password, function(err, res) {
          if(!res) return done(null, false, {message: 'Invalid Password'});
          // console.log(user);
          return done(null, user);
          // return done(null, user);
      });
  });
}

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  // done(null, user);
  User.findOne(user, function(err, user) {
    console.log("User detected and authenticated: " + user.email);
      done(err, user);
    });
});

passport.use(new GoogleStrategy({
    clientID: "446209661898-b0551bgk1d4iu0tehk0b6c92so7j1afi.apps.googleusercontent.com",
    clientSecret: "Xk-nIEQVZN3Kz25E-kjUt0RD",
    callbackURL: "http://localhost:1337/googleCallback"
  }, verifyGoogleHandler
));

passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
  }, verifyLocalHandler
));
