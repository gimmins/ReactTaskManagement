import React, {Component} from 'react';
import Task from 'Task';

class TaskList extends Component {
  renderTasks() {
    var {tasks} = this.props;

    if (tasks.length === 0) {
      return (
        <p className="container__message">No Tasks</p>
      );
    }
    return tasks.map(task => {
      return (
        <Task key={task.uuid} {...task}
              onToggle={this.props.onToggle}
              onToggleEdit={this.props.onToggleEdit}
        />
      );
    });
  }

  render() {
    return (
      <div>
        {this.renderTasks()}
      </div>
    )
  }
}

module.exports = TaskList;
