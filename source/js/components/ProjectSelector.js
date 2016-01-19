var React = require('react');

var ProjectSelector = React.createClass({
  getInitialState: function() {
    return {projects: this.props.projects};
  },
  render: function() {
    const items = [];

    this.state.projects.forEach(function(project) {
      items.push(<option key={project._id} value={project._id}>{project.name}</option>);
    });
    return <select>{items}</select>;
  }
});

module.exports = ProjectSelector;
