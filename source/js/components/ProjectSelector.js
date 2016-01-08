var React = require('react');

var ProjectSelector = React.createClass({
  render: function(){
    var items = [];
    this.props.projects.forEach(function(project){
      items.push(<option key={project._id} value={project._id}>{project.name}</option>);
    });
    return(<select>{items}</select>);
  }
})

module.exports = ProjectSelector;
