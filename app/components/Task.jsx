import React, {Component} from 'react';
import moment from 'moment';

class Task extends Component {
  constructor() {
    super();

    this.state = {
      isEdit: false,
    };
  }

  onEditButtonClick(id) {
    this.setState({
      isEdit: true,
    })
    this.props.onToggleEdit(id);
  }

  onTaskClick(id) {
    this.props.onToggle(id);
  }

  renderTaskDesc() {
    var {description, priority} = this.props;
    var targetDate = moment(this.props.target_date, "YYYY-MM-DD HH:mm:ss").format("dddd, MMMM Do YYYY");
    var priorityText = '';

    switch (priority) {
      case 1: priorityText = 'High';    break;
      case 2: priorityText = 'Medium';  break;
      case 3: priorityText = 'Low';     break;
    }

    return (
      <div>
        <p>{description}</p>
        <p>Target Date: {targetDate}</p>
        <p>Priority: {priorityText}</p>
      </div>
    )
  }

  renderEditButton() {
    var id = this.props.uuid;
    return (
      <div className="large-2 columns">
        <button data-open="exampleModal1" className="button edit-button" onClick={this.onEditButtonClick.bind(this, id)}>
          Edit
        </button>
      </div>
    );
  }

  render() {
    var {completed} = this.props;
    var id = this.props.uuid;
    var taskClassName = completed ? 'large-10 columns task task-completed' : 'large-10 columns task';

    return (
      <div className="row">
        <div className={taskClassName} onClick={this.onTaskClick.bind(this, id)}>
          <div>
            <input type="checkbox" checked={completed ? true : false}/>
          </div>
          {this.renderTaskDesc()}
        </div>
        {!completed ? this.renderEditButton() : ''}
      </div>
    )
  }
}

module.exports = Task;
