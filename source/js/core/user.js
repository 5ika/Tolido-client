const toast = (msg) => Materialize.toast(msg, 3000);

module.exports = function (server) {
  return {
    update: (newPswd, newMail) => {
      $.ajax({
        url: server + '/user/',
        crossDomain: true,
        method: 'POST',
        data: {
          newPswd, newMail
        },
        headers: {
          'x-access-token': userToken
        },
        success: (response) => {
          console.log(response);
          if(response === 'OK')
            toast('Vos informations ont bien été enregistrées');
          else toast('Impossible d\'enregistrer les modifications');
        },
        fail: (response) => {
          toast('Erreur lors de la requête au serveur');
        }
      });
    }
  };
};
