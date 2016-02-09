var React = require('react');
var ReactDOM = require('react-dom');
var ProjectsUI = require('../components/ProjectsUI');
var AddTaskForm = require('../components/addTask');
var ProjectSelector = require('../components/ProjectSelector');
var ProjectsUIComponent, ProjectDeleterComponent, AddTaskFormComponent;

var serverAPI = require('../../../config.js').server;
var API = require('./api')(serverAPI);

exports.init = () => {
  API.getProjects(function(projects) {
    ProjectsUIComponent = ReactDOM.render(<ProjectsUI projects={projects} server={serverAPI} updater={exports.update}/>, document.getElementById('projects'));
    AddTaskFormComponent = ReactDOM.render(<AddTaskForm projects={projects} updater={exports.update}/>, document.getElementById('addTask'));
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
};

exports.update = () => {
  API.getProjects(function (projects) {
    ProjectsUIComponent.setState({
      projects
    });
    ProjectDeleterComponent.setState({
      projects
    });
    AddTaskFormComponent.setState({projects});
    $('select').material_select();
  });
};
