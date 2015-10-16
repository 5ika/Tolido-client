var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');
var request = require('request');
var config = require('../config');

// expose this function to our app using module.exports
module.exports = function(passport) {

	// =========================================================================
	// passport session setup ==================================================
	// =========================================================================
	// required for persistent login sessions
	// passport needs ability to serialize and unserialize users out of session

	// used to serialize the user for the session
	passport.serializeUser(function(user, done) {
		done(null, JSON.stringify(user));
	});

	// used to deserialize the user
	passport.deserializeUser(function(userStringified, done) {
		done(null, JSON.parse(userStringified));
	});

	// =========================================================================
	// LOCAL LOGIN =============================================================
	// =========================================================================
	// we are using named strategies since we have one for login and one for signup
	// by default, if there was no name, it would just be called 'local'

	passport.use('local-login', new LocalStrategy({
			// by default, local strategy uses username and password, we will override with email
			usernameField: 'email',
			passwordField: 'password',
			passReqToCallback: true // allows us to pass back the entire request to the callback
		},
		function(req, email, password, done) {
			request(config.server + '/user/' + email, function(err, response, body) {
				if (err) return done(err);

				body = JSON.parse(body);
				var user = body.user;

				// if no user is found, return the message
				if (!user)
					return done(null, false, req.flash('loginMessage',
						'L\'utilisateur n\'existe pas')); // req.flash is the way to set flashdata using connect-flash

				// if the user is found but the password is wrong
				if (!bcrypt.compareSync(password, user.local.password))
					return done(null, false, req.flash('loginMessage',
						'Oops! Mauvais mot de passe')); // create the loginMessage and save it to session as flashdata

				// token association
				user.token = body.token ? body.token : "No token";

				// all is well, return successful user
				//console.log(user);
				return done(null, user);
			});

		}));

};
