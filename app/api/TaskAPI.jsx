import $ from 'jquery';
import axios from 'axios';

function setTodos (todos) {
  if ($.isArray(todos)) {
    localStorage.setItem('todos', JSON.stringify(todos));
    return todos;
  }
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
  setTodos,
  getTasks,
  // filterTodos,
};
