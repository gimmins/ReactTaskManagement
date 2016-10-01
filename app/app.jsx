var React = require('react');
var ReactDOM = require('react-dom');

var TaskManagementApp = require('TaskManagementApp');

// Load foundation
$(document).foundation();

// App css
require('style!css!sass!applicationStyles')

ReactDOM.render(
  <TaskManagementApp/>,
  document.getElementById('app')
);
