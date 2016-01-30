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
        counter[task.priority]++;
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
        <Counter projects={this.state.projects}/>
        <ProjectsCollection projects={this.state.projects} server={this.props.serverAPI} updater={this.props.updater}/>
      </div>
    );
  }
});

module.exports = ProjectsUI;
