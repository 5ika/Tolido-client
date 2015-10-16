var express = require('express');
var router = express.Router();
var passport = require('passport');
var config = require('../config');
var request = require('request');
var os = require('os');
var serverURL = "http://" + os.hostname + ":5050"

router.get('/', function(req, res) {
    res.redirect(serverURL + '/user/profile');
});

// =====================================
// LOGIN ===============================
// =====================================

// process the login form
router.post('/login', passport.authenticate('local-login'), function(req, res) {
    console.log("[CONNEXION] " + req.user.local.name + " par mobile");
    res.send(req.user);
});

module.exports = router;
