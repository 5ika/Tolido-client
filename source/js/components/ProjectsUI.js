var React = require('react');
var ProjectsCollection = require('./ProjectsCollection');

function countProjectsTasks(projects) {
  const counter = {
    Todo: 0,
    Important: 0,
    Urgent: 0,
    Delay: 0
  };

  for(const project of projects) {
      for(const task of project.tasks) {
        if(!task.done) counter[task.priority]++;
        if(task.delay) counter.Delay++;
      }
  }
  return counter;
}

const Counter = React.createClass({
  render: function () {
      const {
        Todo,
        Important,
        Urgent,
        Delay
      } = countProjectsTasks(this.props.projects);

    return (<div className='counter'>
          <span className='chip urgente'>{Urgent}</span>
          <span className='chip importante'>{Important}</span>
          <span className='chip'>{Todo}</span>
          <span className='chip delayed'>{Delay} <i className='fa fa-clock-o'/></span>
      </div>);
  }
});

const ProjectsUI = React.createClass({
  getInitialState: function() {
    return {projects: this.props.projects};
  },
  render: function() {
    return (<div className='ProjectsUI'>
        <div className='row'>
          <div className='col s12 m6'><h4>Mes tâches</h4></div>
          <div className='col s12 m6'><Counter projects={this.state.projects}/></div>
        </div>
        <ProjectsCollection projects={this.state.projects} server={this.props.serverAPI} updater={this.props.updater}/>
      </div>
    );
  }
});

module.exports = ProjectsUI;
