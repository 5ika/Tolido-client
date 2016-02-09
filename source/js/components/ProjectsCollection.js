var React = require('react');
var serverAPI = require('../../../config.js').server;
var API = require('../core/api')(serverAPI);

var ProjectTasks = React.createClass({
  remove: function(taskId){
      API.deleteTask(taskId, this.props.projectId, this.props.updater);
  },
  valid: function(taskId){
    API.validTask(taskId, this.props.projectId, this.props.updater);
  },
  render: function() {
    // Sort tasks by priority
    this.props.tasks.sort(function(a, b) {
      if(a.priority === 'Urgent' && b.priority !== 'Urgent') return -1;
      else if(a.priority === 'Important' && b.priority === 'Todo') return -1;
      else return 1;
    });

    // Create collection item for each task
    const tasks = [];
    this.props.tasks.forEach((task) => {

      let date = '',group = '', valid = '';

      if(task.delay) date = (new Date(task.delay)).toLocaleDateString();
      if(!task.done)  valid = <i className='fa fa-check fa-lg' onClick={this.valid.bind(null, task._id)}/>;

      if(task.group) group = <span className='group'>{task.group}</span>;

      tasks.push(<li key={task._id} id={task._id} className={'collection-item ' + task.priority + (task.done ? ' done' : '')}>
        <div className='task'>
          <i className='fa fa-circle'/>
          {task.name}
          {group}
          <div className='secondary-content'>
            {date}
            {valid}
            <i className='fa fa-close fa-lg' onClick={this.remove.bind(null, task._id)}/>
          </div>
        </div>
      </li>);
    });
    if(tasks.length > 0) return <div className='tasks'>{tasks}</div>;
    else return null;
  }
});

var ProjectInfos = React.createClass({
  render: function() {
    let numberOfTodo = 0;
    let numberOfImportants = 0;
    let numberOfUrgents = 0;
    let withDelay = false;

    this.props.project.tasks.forEach(function(task) {
      if(task.priority === 'Urgent') numberOfUrgents++;
      else if(task.priority === 'Important') numberOfImportants++;
      else numberOfTodo++;
      if(task.delay) withDelay = true;
    });

    let urgent, important, todo, delay;

    if(numberOfUrgents > 0)
      urgent = <div className='chip urgente'>{numberOfUrgents}</div>;
    if(numberOfImportants > 0)
      important = <div className='chip importante'>{numberOfImportants}</div>;
    if(numberOfTodo > 0)
      todo = <div className='chip'>{numberOfTodo}</div>;
    if(withDelay)
      delay = <i className='fa fa-clock-o'/>;

    return (<div className='right'>
      {delay}
      {urgent}
      {important}
      {todo}
    </div>);
  }
});

var ProjectsCollection = React.createClass({
  render: function() {
    const items = [];

    this.props.projects.forEach((project) => {
      items.push(<li key={project._id} id={project._id} className='project'>
        <div className='collapsible-header row'>
          <div className='col s12 m6'>
            <div className='name'>
              {project.name}
              <span className='category hide animated fadeIn'> - {project.category}</span>
            </div>
            <div className='description hide animated fadeIn'>
              {project.description}
            </div>
        </div>
        <div className='col s12 m6 infos'>
          <ProjectInfos project={project}/>
        </div>
      </div>
        <div className='collapsible-body'>
          <ul className="collection">
            <ProjectTasks tasks={project.tasks} projectId={project._id} updater={this.props.updater}/>
          </ul>
        </div>
      </li>);
    });
    return <ul className='collapsible'>{items}</ul>;
  }
});

module.exports = ProjectsCollection;
