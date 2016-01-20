var serverAPI = require('../../config.js').server;
var User = require('./core/user')(serverAPI);

const toast = (msg) => Materialize.toast(msg, 3000);

const validateEmail = (email) =>
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);

$(document).ready(function () {
  $('.newPswdCheck').change(() => {
    if($('.newPswd').val() !== $('.newPswdCheck').val()) {
      $('.newPswdCheck').addClass('invalid');
    } else $('.newPswdCheck').removeClass('invalid');
  });

  $('button.save').click(() => {
    var newPswd = $('.newPswd').val();
    var newPswdCheck = $('.newPswdCheck').val();
    var newMail = $('.newMail').val();
    console.log(newPswd.length === 0 && newMail.length === 0);

    if(newPswd !== newPswdCheck) {
      toast('Vous n\'avez pas tapé deux fois le même mot de passe');
    } else if(!newPswd.length && !newMail) {
      toast('Il n\'y a rien à enregistrer');
    } else if(!validateEmail(newMail)) {
      toast('Adresse e-mail invalide');
    } else {
      User.update(newPswd, newMail);
    }
  })
});
