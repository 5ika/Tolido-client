var serverAPI = require('../../config.js').server;
var API = require('./core/api')(serverAPI);
var UI = require('./core/UI');

// Suppression d'une tâche (déclenchée par swipe left)
function actionDeleteTask(taskElmt) {
  const projectId = taskElmt.parentsUntil('.collapsible').last()[0].id;
  const taskId = taskElmt.parentsUntil('tasks').first()[0].id;

  taskElmt.parent().addClass('bgSecondary');
  taskElmt.addClass('animated slideOutLeft');
  taskElmt.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
    taskElmt.parent().slideUp(function () {
      API.deleteTask(taskId, projectId, UI.update);
    });
  });
}

// Validation d'une tâche (déclenchée par swipe right)
// TODO
function actionValidTask(taskElmt) {
  taskElmt.parent().addClass('bgPrimary');
  taskElmt.addClass('animated slideOutRight');
}

$(document).ready(function () {
  // Chargement des élements graphiques
  $('select').material_select();

  // Chargement initial de la liste des projets
  UI.init();

  // Chargement des triggers
  $('#addProjectModal .submit').click(function () {
    API.addProject(UI.update);
  });
  $('#addTaskModal .submit').click(function () {
    API.addTask(UI.update);
  });
  $('#deleteProjectModal .submit').click(function () {
    API.deleteProject(UI.update);
  });
});
