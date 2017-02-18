// configured Sails.js to use Passport.js

var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    GoogleStrategy = require('passport-google-oauth20').Strategy;


module.exports = {
    http: {
        customMiddleware: function(app) {
            console.log('Express middleware for passport');
            app.use( passport.initialize() );
            app.use( passport.session() );
        }
    }
};
