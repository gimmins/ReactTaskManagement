import $ from 'jquery';
import axios from 'axios';
import moment from 'moment';

function setTask (task) {
  var taskToPost = task;

  return axios.post('http://localhost:8888/api.php/tasks', task)
  .then(response => {
    if (response.status === 200) {
      return taskToPost;
    } else {
      return null;
    }
  })
  .catch(e => {
    // Fall gracefully...
  });
}

function getTasks () {
  return axios.get('http://localhost:8888/api.php/tasks')
  .then(response => {
    return $.isArray(response.data) ? response.data : [];
  })
  .catch(e => {
    // Fall gracefully...
  });
}

function patchTask(task) {
  var taskToPatch = task;
  var taskId = task.id;

  return axios.patch(`http://localhost:8888/api.php/tasks/${taskId}`, task)
  .then(response => {
    if (response.status === 200) {
      return taskToPatch;
    } else {
      return null;
    }
  })
}

function filterTasks (tasks, showCompleted) {
  var filteredTasks = tasks;

  // Filter by showCompleted
  filteredTasks = filteredTasks.filter((task) => {
    return !task.completed || showCompleted;
  });

  return filteredTasks;
}

function sortByPriority (tasks, showCompleted, orderIn) {
  var filteredTasks = filterTasks(tasks, 0);
  var completedTasks = tasks.filter(task => {
    return task.completed;
  });

  var sortedTasks = _.orderBy(filteredTasks, ['priority'], [orderIn]);
  return [...completedTasks, ...sortedTasks]
}

function sortByDate (tasks, showCompleted, orderIn) {
  var filteredTasks = filterTasks(tasks, 0);
  var completedTasks = tasks.filter((task) => {
    return task.completed;
  });

  // Add unix timestamp for easy sorting
  var filteredTasks = filteredTasks.map(task => {
    task.unix = parseInt(moment(task.target_date, "YYYY-MM-DD HH:mm:ss").format("X"));
    return task;
  })

  var sortedTasks = _.orderBy(filteredTasks, ['unix'], [orderIn]);

  return [...completedTasks, ...sortedTasks]
}

export {
  setTask,
  getTasks,
  patchTask,
  filterTasks,
  sortByPriority,
  sortByDate,
};
