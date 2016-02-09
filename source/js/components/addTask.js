var React = require('react');
var serverAPI = require('../../../config.js').server;
var API = require('../core/api')(serverAPI);
var ProjectSelector = require('./ProjectSelector');

const addTaskForm = React.createClass({
  render: function() {
    return (<div className='card'>
    <div className='card-content'>
      <div className='card-title'>Ajouter une tâche</div>
        <div className='row'>
          <div className='input-field col s12'>
            <input type='text' id='taskName' placeholder='Nouvelle tâche ...'/>
            <label className='active'>Nom de la tâche</label>
          </div>
          <div id='taskIdProject' className='input-field col s12'>
            <ProjectSelector projects={this.props.projects}/>
            <label>Projet</label>
          </div>
          <div className='input-field col s12'>
            <select>
              <option id='add-Todo' value='Todo'>ToDo</option>
              <option id='add-Important' value='Important'>Important</option>
              <option id='add-Urgent' value='Urgent'>Urgent</option>
            </select>
            <label>Priorité</label>
          </div>
          <div className='input-field col s12'>
            <input type='date' id='taskDelay' className='datepicker'/>
            <label className='active'>Date</label>
          </div>
          <div className='col s12'>
            <button className='btn btn-lg' onClick={this.sendTask}>Ajouter</button>
          </div>
        </div>
  </div></div>
    );
  },
  componentDidMount: function() {
    $('.datepicker').pickadate({
      selectMonths: true,
      selectYears: 15
    });
  },
  sendTask: function() {
    API.addTask(this.props.updater);
  }
});

module.exports = addTaskForm;
