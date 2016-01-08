var React = require('react');

var ProjectTasks = React.createClass({
  render: function(){
    // Sort tasks by priority
    this.props.tasks.sort(function(a,b){
      if(a.priority == 'Urgent' && b.priority != 'Urgent') return -1;
      else if(a.priority == 'Important' && b.priority == 'Todo') return -1;
      else return 1;
    });

    // Create collection item for each task
    var tasks = [];
    this.props.tasks.forEach(function(task){
      let date = '';
      if(task.delay){
        date = <div className='secondary-content'>{(new Date(task.delay)).toLocaleDateString()}</div>;
      }
      tasks.push(<li key={task._id} id={task._id} className={"collection-item "+task.priority}>
        <div className='task'>
          <i className='fa fa-circle'/>
          {task.name} [{task.group}]
          {date}
        </div>
      </li>)
    });
    if(tasks.length > 0) return (<div className='tasks'>{tasks}</div>);
    else return null;
  }
});

var ProjectInfos = React.createClass({
  render: function(){
    var numberOfTodo = 0;
    var numberOfImportants = 0;
    var numberOfUrgents = 0;
    this.props.project.tasks.forEach(function(task){
      if(task.priority == 'Urgent') numberOfUrgents++;
      else if(task.priority == 'Important') numberOfImportants++;
      else numberOfTodo++;
    })

    var urgent,importants = '';
    if(numberOfUrgents > 0)
      urgent = <div className='chip urgente'>{numberOfUrgents}</div>;
    if(numberOfImportants > 0)
      importants = <div className='chip importante'>{numberOfImportants}</div>;

    return (<div className='right'>
      {urgent}
      {importants}
      <div className='chip'>{numberOfTodo}</div>
    </div>);
  }
});

var ProjectsCollection = React.createClass({
  render: function(){
    var items = [];
    this.props.projects.forEach(function(project){
      items.push(<li key={project._id} id={project._id} className='project'>
        <div className='collapsible-header row'>
          <div className='col s12 m6'>
            {project.name}
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
    return(<ul className='collapsible'>{items}</ul>);
  }
})

module.exports = ProjectsCollection;
