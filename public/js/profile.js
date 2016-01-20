(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var os = require("os");

var config = {
    // App infos
    app: {
        name: "Tolido Client",
        port: 5050
    },
    server: "http://" + os.hostname() + ":3000" };
//A modifier si le client ne tourne pas sur le même hôte que le serveur
module.exports = config;

},{"os":2}],2:[function(require,module,exports){
exports.endianness = function () { return 'LE' };

exports.hostname = function () {
    if (typeof location !== 'undefined') {
        return location.hostname
    }
    else return '';
};

exports.loadavg = function () { return [] };

exports.uptime = function () { return 0 };

exports.freemem = function () {
    return Number.MAX_VALUE;
};

exports.totalmem = function () {
    return Number.MAX_VALUE;
};

exports.cpus = function () { return [] };

exports.type = function () { return 'Browser' };

exports.release = function () {
    if (typeof navigator !== 'undefined') {
        return navigator.appVersion;
    }
    return '';
};

exports.networkInterfaces
= exports.getNetworkInterfaces
= function () { return {} };

exports.arch = function () { return 'javascript' };

exports.platform = function () { return 'browser' };

exports.tmpdir = exports.tmpDir = function () {
    return '/tmp';
};

exports.EOL = '\n';

},{}],3:[function(require,module,exports){
'use strict';

var serverAPI = require('../../config.js').server;
var User = require('./core/user')(serverAPI);

var toast = function toast(msg) {
  return Materialize.toast(msg, 3000);
};

var validateEmail = function validateEmail(email) {
  return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
  );
};

$(document).ready(function () {
  $('.newPswdCheck').change(function () {
    if ($('.newPswd').val() !== $('.newPswdCheck').val()) {
      $('.newPswdCheck').addClass('invalid');
    } else $('.newPswdCheck').removeClass('invalid');
  });

  $('button.save').click(function () {
    var newPswd = $('.newPswd').val();
    var newPswdCheck = $('.newPswdCheck').val();
    var newMail = $('.newMail').val();
    console.log(newPswd.length === 0 && newMail.length === 0);

    if (newPswd !== newPswdCheck) {
      toast('Vous n\'avez pas tapé deux fois le même mot de passe');
    } else if (!newPswd.length && !newMail) {
      toast('Il n\'y a rien à enregistrer');
    } else if (!validateEmail(newMail)) {
      toast('Adresse e-mail invalide');
    } else {
      User.update(newPswd, newMail);
    }
  });
});

},{"../../config.js":1,"./core/user":4}],4:[function(require,module,exports){
'use strict';

var toast = function toast(msg) {
  return Materialize.toast(msg, 3000);
};

module.exports = function (server) {
  return {
    update: function update(newPswd, newMail) {
      $.ajax({
        url: server + '/user/',
        crossDomain: true,
        method: 'POST',
        data: {
          newPswd: newPswd, newMail: newMail
        },
        headers: {
          'x-access-token': userToken
        },
        success: function success(response) {
          console.log(response);
          if (response === 'OK') toast('Vos informations ont bien été enregistrées');else toast('Impossible d\'enregistrer les modifications');
        },
        fail: function fail(response) {
          toast('Erreur lors de la requête au serveur');
        }
      });
    }
  };
};

},{}]},{},[3]);
