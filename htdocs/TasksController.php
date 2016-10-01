<?php
namespace RESTfulApi;

class TasksController
{
  public $db;

  function __construct($db) {
    $this->db = $db;
  }

  // url = '/tasks' method = GET
  public function getAction($request) {
    $table = $request[0];

	if (is_array($request) && strcmp($table, 'tasks') == 0) {
      $sql = "SELECT * FROM `$table`";
      return $this->db->query($sql);
    }

    return null;
  }

  // /tasks POST
  public function setAction($request, $body) {
  	$table = $request[0];
	
    // Sanity check
    if (is_array($request) && strcmp($table, 'tasks') == 0) {
      $sql = 'INSERT INTO (task_uuid, task_description, task_targetdate, task_priority, task_completed)';
      // $values = 'VALUES $body'
      // $result = $this->db->query($sql);
    }
  }

  // /tasks/{task_id} UPDATE
  public function patchAction($request, $body) {
    // Sanity check
    if (is_array($request) && strcmp($request[0].equals(), 'tasks')) {
      $task_id = intval($request[1].trim());
      // $sql = 'UPDATE tasks';
      // $set = 'SET task_description=$body, task_targetdate=$body, $task_priority=$body, $task_completed'
      // $where = 'WHERE task_id=$task_id'
      // $result = $this->db->query($sql);
    }
  }
}
