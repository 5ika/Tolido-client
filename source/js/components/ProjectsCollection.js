var React = require('react');

var ProjectTasks = React.createClass({
  render: function() {
    // Sort tasks by priority
    this.props.tasks.sort(function(a, b) {
      if(a.priority === 'Urgent' && b.priority !== 'Urgent') return -1;
      else if(a.priority === 'Important' && b.priority === 'Todo') return -1;
      else return 1;
    });

    // Create collection item for each task
    const tasks = [];

    this.props.tasks.forEach(function(task) {
      let date = '';
      let group = '';

      if(task.delay) {
        date = <div className='secondary-content'>{(new Date(task.delay)).toLocaleDateString()}</div>;
      }

      if(task.group) group = <span className='group'>{task.group}</span>;

      tasks.push(<li key={task._id} id={task._id} className={'collection-item ' + task.priority}>
        <div className='task'>
          <i className='fa fa-circle'/>
          {task.name}
          {group}
          {date}
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
      todo = <div className='chip'>{numberOfTodo}</div>
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

    this.props.projects.forEach(function(project) {
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
            <ProjectTasks tasks={project.tasks}/>
          </ul>
        </div>
      </li>);
    });
    return <ul className='collapsible'>{items}</ul>;
  }
});

module.exports = ProjectsCollection;
