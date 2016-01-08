var React = require('react');
var ReactDOM = require('react-dom');
var ProjectsCollection = require('./components/ProjectsCollection');
var ProjectSelector = require('./components/ProjectSelector');
var serverAPI = require('../../config.js').server;
var API = require('./core/api')(serverAPI);

// Chargement/Mise à jour de la liste des projets
function updateUI(){
  API.getProjects(function(projects){
    var ProjectsCollectionComponent = ReactDOM.render(<ProjectsCollection projects={projects} server={serverAPI}/>, document.getElementById('container'));
    var ProjectSelectorComponent = ReactDOM.render(<ProjectSelector projects={projects}/>, document.getElementById('taskIdProject'));
    var ProjectDeleterComponent = ReactDOM.render(<ProjectSelector projects={projects}/>, document.getElementById('removeIdProject'));
    $('select').material_select();
    $('.collapsible').collapsible();

    $(".options .fa-trash-o").unbind().click(function(ev){
      var projectId = $(this).parentsUntil('.collapsible').last()[0].id;
      API.deleteProject(projectId, updateUI);
    });

    let swipeOffset = (40 * $(".collapsible").width()) / 100;
    $(".tasks .collection-item .task").swipe({
      swipeStatus: function (event, phase, direction, distance, duration, fingerCount) {
        if(distance > swipeOffset) {
          $(this).unbind();
          if(direction == 'left') actionDeleteTask($(this));
          if(direction == 'right') actionValidTask($(this));
        }
      }
    })
  });
}

$(document).ready(function () {
  // Chargement des élements graphiques
  $('select').material_select();
  $('.datepicker').pickadate({
    selectMonths: true,
    selectYears: 15
  });

  // Chargement initial de la liste des projets
  updateUI();

  // Chargement des triggers
  $("#addProjectModal .submit").click(function () {
    API.addProject(updateUI);
  });
  $("#addTaskModal .submit").click(function () {
    API.addTask(updateUI);
  });
  $("#deleteProjectModal .submit").click(function(){
    API.deleteProject(updateUI);
  });
});

function actionDeleteTask(taskElmt) {
  var projectId = taskElmt.parentsUntil('.collapsible').last()[0].id;
  console.log(projectId);
  var taskId = taskElmt.parentsUntil('tasks').first()[0].id;
  console.log(taskId);
  taskElmt.parent().addClass('bgSecondary');
  taskElmt.addClass('animated slideOutLeft');
  taskElmt.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
    taskElmt.parent().slideUp(function () {
      API.deleteTask(taskId, projectId, updateUI);
    });
  })
}
function actionValidTask(taskElmt){
  taskElmt.parent().addClass('bgPrimary');
  taskElmt.addClass('animated slideOutRight');
}
