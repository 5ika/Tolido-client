function toast(msg) {
  Materialize.toast(msg, 3000);
}

module.exports = function (server) {
  var api = {};

  //Récupère la liste les projets
  api.getProjects = function (callback) {
    api.sendRequestToAPI('GET', '/', null, function (projects) {
      projects.sort(function (a, b) {
        var aDate = new Date(a.date),
          bDate = new Date(b.date);
        if(aDate < bDate) return -1;
        else return 1;
      })
      if(projects) callback(projects);
    })
  }

  function getSelectedPriority() {
    if($("#" + "add-Important").is(':checked')) return "Important";
    else if($("#" + "add-Urgent").is(':checked')) return "Urgent";
    else return "Todo";
  }

  // Ajoute une nouvelle tâche
  api.addTask = function (callback) {
    var idProject = $('#taskIdProject select').val();
    var newTask = {
      name: $('#taskName').val(),
      group: $('#taskGroup').val(),
      priority: getSelectedPriority(),
      delay: $("#taskDelay").val(),
    }
    api.sendRequestToAPI('POST', '/' + idProject, newTask, function (response) {
      if(response.hasOwnProperty('result') && response.result ==
        "success") {
        $('#addTaskModal').closeModal();
        toast("Tâche ajoutée");
        $('#taskName').val('');
        $('#taskGroup').val('');
        callback();
      }
    })
  }

  // // Récupère les infos d'une tâche
  // function getTask(idTask, idProject, callback) {
  //     sendRequestToAPI("GET", '/' + idProject + '/' + idTask, null, function(task) {
  //         callback(task);
  //     })
  // }
  //
  // // Actualise les infos d'un projet
  // function getProject(id, callback) {
  //     sendRequestToAPI('GET', '/' + id, null, function(project) {
  //         callback(project);
  //     })
  // }

  // Supprime une tâche
  api.deleteTask = function (id, projectId, callback) {
    api.sendRequestToAPI('DELETE', '/' + projectId + '/' + id, null, function (
      response) {
      if(response.hasOwnProperty('result') && response.result ==
        "success") {
        toast("Tâche supprimée");
        callback();
      }
    });
  }

  // // Valide une tâche
  // function validTask(id, projectId) {
  //     sendRequestToAPI('PUT', '/' + projectId + '/' + id + '/done', null,
  //         function(
  //             response) {
  //             if (response.hasOwnProperty('result') && response.result ==
  //                 "success") {
  //                 toast("Tâche validée");
  //                 refreshProject(projectId);
  //             }
  //         });
  // }
  //
  // // Modifie une tâche
  // function updateTask() {
  //     $("#updateTaskModal").closeModal();
  //     var projectId = $("#updateTaskModal .projectID").val(),
  //         taskId = $("#updateTaskModal .taskID").val();
  //
  //     sendRequestToAPI('PUT', '/' + projectId + '/' + taskId, {
  //             task: {
  //                 name: $("#updateTaskModal .taskName").val(),
  //                 group: $("#updateTaskModal .taskGroup").val(),
  //                 priority: getSelectedPriority('update'),
  //                 delay: $("#updateTaskModal .taskDelay").val()
  //             }
  //         },
  //         function(response) {
  //             if (response.hasOwnProperty('result') && response.result ==
  //                 "success") {
  //                 toast("Tâche modifiée");
  //                 refreshProject(projectId);
  //             }
  //         });
  // }

  // Supprime un projet
  api.deleteProject = function (callback) {
    var idProject = $('#removeIdProject select').val();
    if(confirm("Êtes-vous certain de vouloir supprimer le projet ?"))
      api.sendRequestToAPI('DELETE', '/' + idProject, null, function (response) {
        if(response.hasOwnProperty('result') && response.result ==
          "success") {
          toast("Projet supprimé");
          callback();
        }
      })
  }

  // Ajoute un projet
  api.addProject = function (callback) {
    var newProject = {
      name: $('#projectName').val(),
      description: $('#projectDescription').val(),
      category: $('#projectCategory').val(),
      date: Date.now
    };
    api.sendRequestToAPI('POST', '/', newProject, function (project) {
      $('#addProjectModal').closeModal();
      toast("Projet ajouté");
      $('#projectName').val('');
      $('#projectDescription').val('');
      $('#projectCategory').val('');
      callback();
    });
  }

  // function updateProject() {
  //     $("#updateProjectModal").closeModal();
  //     var idProject = $('#updateProjectModal .projectID').val();
  //     var updatedProject = {
  //         name: $('#updateProjectModal .projectName').val(),
  //         description: $('#updateProjectModal .projectDescription').val(),
  //         category: $('#updateProjectModal .projectCategory').val(),
  //     }
  //     console.log(idProject);
  //     sendRequestToAPI('PUT', '/' + idProject, updatedProject, function(response) {
  //         if (response.hasOwnProperty('result') && response.result ==
  //             "success") {
  //             toast("Projet modifié");
  //             refreshProject(idProject);
  //         }
  //     })
  // }

  // Lance les requêtes à l'API avec tous les paramètres
  api.sendRequestToAPI = function (type, path, data, callback) {
    $.ajax({
      url: server + "/api" + path,
      crossDomain: true,
      method: type,
      data: data,
      headers: {
        'x-access-token': userToken
      }
    }).done(function (data) {
      callback(data);
    }).fail(function (data) {
      console.log(data);
      toast("Erreur lors de la requête à l'API");
      callback(null);
    });
  }

  return api;
};
