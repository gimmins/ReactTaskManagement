import $ from 'jquery';
import axios from 'axios';

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
    console.log(response);
    if (response.status === 200) {
      return taskToPatch;
    } else {
      return null;
    }
  })
}

// function filterTodos (todos, showCompleted, searchText) {
  // var filteredTodos = todos;
  //
  // // Filter by showCompleted
  // filteredTodos = filteredTodos.filter((todo) => {
  //   return !todo.completed || showCompleted;
  // });
  //
  // // Filter by searchText
  // // filteredTodos = filteredTodos.filter((todo) => {
  // //   var text = todo.text.toLowerCase();
  // //   return searchText.length === 0 || text.indexOf(searchText) > -1;
  // // });
  //
  // // Sort todos with non-completed first
  // filteredTodos.sort((a, b) => {
  //   if (!a.completed && b.completed) {
  //     return -1;
  //   } else if (a.completed && !b.completed) {
  //     return 1;
  //   } else {
  //     return 0;
  //   }
  // });
  //
  // return filteredTodos;
// }

export {
  setTask,
  getTasks,
  patchTask,
  // filterTodos,
};
