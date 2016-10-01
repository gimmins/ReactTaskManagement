import React, {Component} from 'react';
import uuid from 'node-uuid';

class AddTask extends Component {

  constructor() {
    super();

    this.state = {
      taskDesc: '',
      taskTargetDate: '',
      taskPriority: 1,
    }
  }

  onDescChange(e) {
    this.setState({
      taskDesc: e.target.value,
    })
  }

  onDateChange(e) {
    this.setState({
      taskTargetDate: e.target.value,
    });
  }

  onPriorityChange(e) {
    this.setState({
      taskPriority: e.target.value,
    })
  }

  handleSubmit(e) {
    e.preventDefault();

    let task = {
      uuid: uuid(),
      taskTargetDate: this.state.taskTargetDate,
      priority: this.state.taskPriority,
      taskDesc: this.state.taskDesc,
    }

    if (task.taskDesc.length > 0) {
      this.state = {
        taskDesc: '',
        taskTargetDate: '',
        taskPriority: 1,
      }
      this.props.onAddTask(task);
    } else {
      this.refs.taskText.focus();
    }
  }

  renderPriority() {
    return(
      <select ref="priority" value={this.state.priority} onChange={this.onPriorityChange.bind(this)}>
        <option value="1" key='priority_high'>High</option>
        <option value="2" key='priority_medium'>Medium</option>
        <option value="3" key='priority_low'>Low</option>
      </select>
    );
  }

  render() {
    return (
      <div className="container__footer">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type="text" ref="taskText" placeholder="Please enter a task" value={this.state.taskDesc} onChange={this.onDescChange.bind(this)}/>
          <label>
            Target Date
            <input type="date" ref="targetDate" name="targetDate" value={this.state.targetDate} onChange={this.onDateChange.bind(this)}/>
          </label>

          <div className="row">
            <div className="large-4 columns">
              <label>Priority
                {this.renderPriority()}
              </label>
            </div>
          </div>
          <button className="button expanded">Add Tasks</button>
        </form>
      </div>
    );
  }
}

module.exports = AddTask;
