var React = require('react');
var ReactDOM = require('react-dom');
var ProjectsUI = require('./components/ProjectsUI');
var ProjectSelector = require('./components/ProjectSelector');
var serverAPI = require('../../config.js').server;
var API = require('./core/api')(serverAPI);

var ProjectsUIComponent, ProjectSelectorComponent, ProjectDeleterComponent;

// Mise à jour de la liste des projets
function updateUI() {
  API.getProjects(function(projects) {
    ProjectsUIComponent.setState({projects});
    ProjectSelectorComponent.setState({projects});
    ProjectDeleterComponent.setState({projects});
    $('select').material_select();
  });
}

// Suppression d'une tâche (déclenchée par swipe left)
function actionDeleteTask(taskElmt) {
  const projectId = taskElmt.parentsUntil('.collapsible').last()[0].id;
  const taskId = taskElmt.parentsUntil('tasks').first()[0].id;

  taskElmt.parent().addClass('bgSecondary');
  taskElmt.addClass('animated slideOutLeft');
  taskElmt.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
    taskElmt.parent().slideUp(function () {
      API.deleteTask(taskId, projectId, updateUI);
    });
  });
}

// Validation d'une tâche (déclenchée par swipe right)
// TODO
function actionValidTask(taskElmt) {
  taskElmt.parent().addClass('bgPrimary');
  taskElmt.addClass('animated slideOutRight');
}

// Initialisation de la liste des projets
function initUI() {
  API.getProjects(function(projects) {
    ProjectsUIComponent = ReactDOM.render(<ProjectsUI projects={projects} server={serverAPI}/>, document.getElementById('container'));
    ProjectSelectorComponent = ReactDOM.render(<ProjectSelector projects={projects}/>, document.getElementById('taskIdProject'));
    ProjectDeleterComponent = ReactDOM.render(<ProjectSelector projects={projects}/>, document.getElementById('removeIdProject'));
    $('select').material_select();
    $('.collapsible').collapsible();

    const swipeOffset = 40 * $('.collapsible').width() / 100;

    $('.tasks .collection-item .task').swipe({
      swipeStatus: function (event, phase, direction, distance) {
        if(distance > swipeOffset) {
          $(this).unbind();
          if(direction === 'left') actionDeleteTask($(this));
          if(direction === 'right') actionValidTask($(this));
        }
      }
    });
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
  initUI();

  // Chargement des triggers
  $('#addProjectModal .submit').click(function () {
    API.addProject(updateUI);
  });
  $('#addTaskModal .submit').click(function () {
    API.addTask(updateUI);
  });
  $('#deleteProjectModal .submit').click(function () {
    API.deleteProject(updateUI);
  });
});
