'use strict';
var React = require('react');
var ReactDOM = require('react-dom');
var ProjectsUI = require('../components/ProjectsUI');
var ProjectSelector = require('../components/ProjectSelector');

var ProjectsUIComponent, ProjectSelectorComponent, ProjectDeleterComponent;

var serverAPI = require('../../../config.js').server;
var API = require('./api')(serverAPI);


exports.init = () => {
  API.getProjects(function(projects) {
    ProjectsUIComponent = ReactDOM.render(<ProjectsUI projects={projects} server={serverAPI} updater={exports.update}/>, document.getElementById('container'));
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
};

exports.update = () => {
  API.getProjects(function(projects) {
    ProjectsUIComponent.setState({projects});
    ProjectSelectorComponent.setState({projects});
    ProjectDeleterComponent.setState({projects});
    $('select').material_select();
  });
}
