<?php
namespace Api;

include 'TasksController.php';
include 'TasksBuilder.php';
include 'DB.php';

use RESTfulApi;
use JSONFormatter;
use Database;

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// get the HTTP method, path and body of the request
$method = $_SERVER['REQUEST_METHOD'];
$request = explode('/', trim($_SERVER['PATH_INFO'],'/'));
$input = json_decode(file_get_contents('php://input'),true);

$db = new \Database\DB();
$tasks_controller = new \RESTfulApi\TasksController($db);
$tasks_builder = new \JSONFormatter\TasksBuilder();

switch ($method) {
  case 'GET':
    $res = $tasks_controller->getAction($request);
	$tasks_builder->toJson($res);
    break;
  case 'POST':
    $res = $tasks_controller->setAction($request, $input);
    break;
  case 'PATCH':
    $res = $tasks_controller->patchAction($request[0], $request[1], $input);
    break;
}

$db->close();

// // create SQL based on HTTP method
// switch ($method) {
//   case 'GET':
//     $sql = "select * from `$table`".($key?" WHERE id=$key":''); break;
//   case 'PUT':
//     $sql = "update `$table` set $set where id=$key"; break;
//   case 'POST':
//     $sql = "insert into `$table` set $set"; break;
//   case 'DELETE':
//     $sql = "delete `$table` where id=$key"; break;
// }
//
// // excecute SQL statement
// $result = mysqli_query($link,$sql);
//
// // die if SQL statement failed
// if (!$result) {
//   http_response_code(404);
//   die(mysqli_error());
// }
//
// // print results, insert id or affected row count
// if ($method == 'GET') {
//   if (!$key) echo '[';
//   for ($i=0;$i<mysqli_num_rows($result);$i++) {
//     echo ($i>0?',':'').json_encode(mysqli_fetch_object($result));
//   }
//   if (!$key) echo ']';
// } elseif ($method == 'POST') {
//   echo mysqli_insert_id($link);
// } else {
//   echo mysqli_affected_rows($link);
// }
//
// // close mysql connection
// mysqli_close($link);
