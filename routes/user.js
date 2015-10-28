var express = require('express');
var router = express.Router();
var passport = require('passport');
var config = require('../config');
var request = require('request');

router.get('/', function(req, res) {
    res.redirect('/user/profile');
});

// =====================================
// LOGIN ===============================
// =====================================
// show the login form
router.get('/login', function(req, res) {
    console.log(req.user);

    // render the page and pass in any flash data if it exists
    res.render('login', {
        message: req.flash('loginMessage')
    });
});

// process the login form
router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/', // redirect to the secure profile section
    failureRedirect: '/user/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
}));
// =====================================
// SIGNUP ==============================
// =====================================
// show the signup form
router.get('/signup', function(req, res) {
    res.redirect(config.server + '/user/signup');
});

// =====================================
// PROFILE SECTION =====================
// =====================================
router.get('/profile', isLoggedIn, function(req, res) {
    console.log(req.user);
    res.render('profile', {
        title: "Profile de " + req.user.local.name,
        user: req.user
    });
});

// =====================================
// LOGOUT ==============================
// =====================================
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/user/login');
});

// =====================================
// DELETE USER?=========================
// =====================================
router.get('/delete', function(req, res) {
    request.del({
        url: config.server + '/user/delete',
        form: {
            user: req.user
        }
    }, function(err,
        response,
        body) {
        if (!err) {
            req.logout();
            res.render('login', {
                message: "L'utilisateur a bien été supprimé"
            });
        } else res.render('profile', {
            user: req.user,
            message: "Impossible de supprimer l'utilisateur"
        });
    });

});

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/user/login');
}

module.exports = router;
