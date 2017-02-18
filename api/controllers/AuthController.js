/**
 * AuthController
 *
 * @description :: Server-side logic for managing Auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 // Here we have defined the 'login', 'process' and 'logout' actions corresponding to the routes defined above.
 //
 // AuthController.login calls res.view() which will display login form. Since no path is passed to this res.view(), this will default to 'views/CONTROLLERNAME/ACTION.ejs' which in this case will be 'views/auth/login.ejs'.
 var passport = require('passport');

 module.exports = {

     login: function(req, res) {
         res.view();
     },
     process: function(req, res) {
         passport.authenticate('local', function(err, user, info) {
           console.log("Headers were set: "+res.headersSent);
             if( (err)||(!user) ) {
                 return res.send({
                     message: 'login failed'
                    // message: user
                 });
                 res.send(err);
             };
             req.logIn(user, function(err) {
              //  return res.send(user);
                 if(err) {
                   console.log("Errors were detected: "+err);
                   res.send(err)
                 } else {
                //  res.send("TEST");
                 return res.send({
                     message: 'login successful'
                 })
               };
             });
         }) (req, res);
     },
     logout: function(req, res) {
         req.logOut();
         res.send('logout successful');
     },

  googleAuth: function(req, res) {
    passport.authenticate('google', {
      failureRedirect: '/login',
      scope: [
        'https://www.googleapis.com/auth/plus.login',
        'https://www.googleapis.com/auth/plus.profile.emails.read',
        'email'
      ]
    },
    function(err, user) {
      console.log("helllllooooo");
      req.logIn(user, function(err) {
        if (err) {
          console.log(err);
          res.view('500');
          return;
        }
        res.redirect('/user');
        return;
      });
    })(req, res);
  },
    googleCallback: function(req, res) {
      passport.authenticate(
        'google',
          function(error, user, info) {
            console.log("AuthController line: 105");
            console.log(user);
            // do stuff with user
            req.logIn(user, function(err) {
              console.log("AuthController line: 108");
              if (err) {
                // res.view('500');
                res.send("Sorry there was an account error...<br>"+err);
                return;
              }
              req.session.me = user.id;
              console.log("User id was stored: "+req.session.me);
              res.view('user/profile',{
                    user: user,
                    test: user.email
                  });
              // res.redirect('/user/'+user.id);
              // res.send(user);
            });
          })(req, res);
    }
 };

 module.exports.blueprints = {
     actions: true,
     rest: true,
     shortcuts: true
 };
