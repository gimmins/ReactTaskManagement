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
      $task_uuid = $body['uuid'];
	  $task_description = $body['taskDesc'];
	  $task_targetdate = $body['taskTargetDate'];
	  $task_priority = $body['priority'];
	  
      $sql = 'INSERT INTO `tasks` (`uuid`, `description`, `target_date`, `priority`, `completed`)';
      $values = " VALUES ('$task_uuid', '$task_description', '$task_targetdate', $task_priority, 0)";
	  
	  $result = $this->db->query($sql . $values);
    }
  }

  // /tasks/{task_id} UPDATE
  public function patchAction($table, $id, $body) {
  	$task_description = $body['description'];
	$task_targetdate = $body['target_date'];
	$task_priority = $body['priority'];
	$task_completed = $body['completed'];
	  
    // Sanity check
    if (strcmp($table, 'tasks') == 0) {
      $sql = 'UPDATE `tasks` ';
      $set = " SET `description`='$task_description', `target_date`='$task_targetdate', `priority`=$task_priority, `completed`=$task_completed";
      $where = " WHERE `id`=$id";
      $result = $this->db->query($sql . $set . $where);
    }
  }
}
