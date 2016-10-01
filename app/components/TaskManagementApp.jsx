import React, {Component} from 'react';

import uuid from 'node-uuid';
import moment from 'moment';
import axios from 'axios';
import _ from 'lodash';

import TaskList from 'TaskList';
import AddTask from 'AddTask';

import * as TaskAPI from 'TaskAPI';

class TaskManagementApp extends Component {
  constructor() {
    super();

    this.state = {
      idToEdit: '',
      showEditor: false,
      showCompleted: false,
      taskDescToEdit: '',
      taskTargetDateToEdit: '',
      taskPriorityToEdit: 1,
      tasks: [],
    }

    this.indexToReplace = 0;
    this.handleEdit = this.handleEdit.bind(this);
    this.handleAddTask = this.handleAddTask.bind(this);
  }

  componentDidMount() {
    var that = this;
    TaskAPI.getTasks().then(tasks => {
      if (tasks.length > 0) {
        tasks.map(task => {
          task.completed = parseInt(task.completed);
          task.priority = parseInt(task.priority);
          return task;
        });
      }

      that.setState({
        tasks: tasks
      })
    })
  }

  handleAddTask(task) {
    var that = this;
    TaskAPI.setTask(task).then(response => {
      that.setState({
        tasks: [
          ...that.state.tasks,
          {
            completed: 0,
            description: response.taskDesc,
            priority: parseInt(response.priority),
            target_date: response.taskTargetDate,
            uuid: response.uuid,
          }
        ]
      });
    })
  }

  handleToggle(id) {
    var updatedTasks = this.state.tasks.map((task) => {
      if (task.uuid === id) {
        task.completed = !task.completed;
      }
      return task;
    });
    this.setState({tasks: updatedTasks});
  }

  handleSearch(showCompleted, searchText) {
    this.setState({
      showCompleted: showCompleted,
      searchText: searchText.toLowerCase()
    });
  }

  toggleCompleted(e) {
    this.setState({
      showCompleted: this.refs.showCompleted.checked,
    });
  }

  handleEdit(id) {
    var idToEdit = id;
    var indexToReplace = 0;
    var taskToEdit = null;

    this.state.tasks.map((task, index) => {
      if (task.uuid === idToEdit) {
        indexToReplace = index;
        taskToEdit = task;
      }
    })

    this.indexToReplace = indexToReplace;
    var targetDate = moment(taskToEdit.target_date, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD");

    this.setState({
      showEditor: true,
      idToEdit: id,
      taskDescToEdit: taskToEdit.description,
      taskTargetDateToEdit: targetDate,
      taskPriorityToEdit: taskToEdit.priority,
    });
  }

  onDescChange(e) {
    this.setState({
      taskDescToEdit: e.target.value,
    })
  }

  onDateChange(e) {
    this.setState({
      taskTargetDateToEdit: e.target.value,
    })
  }

  onPriorityChange(e) {
    this.setState({
      taskPriorityToEdit: e.target.value,
    })
  }

  renderPriority(priority) {
    return(
      <select ref="edit_priority" defaultValue={priority} onChange={this.onPriorityChange.bind(this)}>
        <option value="1" key='priority_high'>High</option>
        <option value="2" key='priority_medium'>Medium</option>
        <option value="3" key='priority_low'>Low</option>
      </select>
    );
  }

  submitEdit(e) {
    e.preventDefault();

    var indexToChange = this.indexToReplace;
    var editedTasks = this.state.tasks.slice();

    editedTasks.map((task, index) => {
      if (index == indexToChange) {
        task.description = this.state.taskDescToEdit;
        task.target_date = this.state.taskTargetDateToEdit;
        task.priority = parseInt(this.state.taskPriorityToEdit);

        TaskAPI.patchTask(task);
        this.onModalClose();
        return task;
      }
    })
    this.setState({
      tasks: editedTasks,
    })
  }

  onModalClose() {
    this.setState({
      showEditor: false,
      idToEdit: 0,
      taskDescToEdit: '',
      taskTargetDateToEdit: '',
      taskPriorityToEdit: '',
    })
  }

  renderEditModal() {
    if (!this.state.showEditor) {
      return;
    }

    if (this.state.showEditor) {
      return (
        <div className="task-edit-modal">
          <div className="container modal-content">
            <form onSubmit={this.submitEdit.bind(this)}>
              <input type="text" ref="edit_desc" defaultValue={this.state.taskDescToEdit} onChange={this.onDescChange.bind(this)}/>
              <input type="date" ref="edit_date" defaultValue={this.state.taskTargetDateToEdit} onChange={this.onDateChange.bind(this)}/>
              {this.renderPriority(this.state.taskPriorityToEdit)}
              <button className="button expanded">
                Submit
              </button>
            </form>
            <button className="button expanded" onClick={this.onModalClose.bind(this)}>
              Cancel
            </button>
          </div>
        </div>
      )
    }
  }

  sortByPriority() {
    var taskstosort = this.state.todos.slice();
    var newsortedtasks = _.orderBy(taskstosort, ['priority'], ['asc']);

    this.setState({
      todos: newsortedtasks,
    })
  }

  sortByTargetDate() {
    var taskstosort = this.state.todos.slice();
    var newsortedtasks = _.orderBy(taskstosort, ['targetDate'], ['asc']);

    this.setState({
      todos: newsortedtasks,
    })
  }

  renderSortButtons() {
    return (
      <div className="row">
        <div className="large-6 columns">
          <button className="button expanded" onClick={this.sortByPriority}>Sort by priority</button>
        </div>
        <div className="large-6 columns">
          <button className="button expanded" onClick={this.sortByTargetDate}>Sort by target date</button>
        </div>
      </div>
    )
  }

  render() {
    var {tasks, showCompleted, searchText} = this.state;

    return (
      <div>
        {this.renderEditModal()}
        <h1 className="page-title">Task Management</h1>
        <div className="row">
          <div className="small-8 large-centered large-8 columns">
            <div className="container">
              {this.renderSortButtons()}
              <label>
                <input type="checkbox" ref="showCompleted" onChange={this.toggleCompleted}/>
                Show completed todos
              </label>
              <TaskList tasks={tasks} onToggle={this.handleToggle.bind(this)} onToggleEdit={this.handleEdit}/>
              <AddTask onAddTask={this.handleAddTask}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

module.exports = TaskManagementApp;
