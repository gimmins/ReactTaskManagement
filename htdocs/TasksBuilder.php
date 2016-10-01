<?php
namespace JSONFormatter;

class TasksBuilder 
{
	public function toJson($tasks) {
		echo '[';
		for ($i=0; $i<mysqli_num_rows($tasks); $i++) {
	    	echo ($i>0?',':'').json_encode(mysqli_fetch_object($tasks));
	  	}
		echo ']';
	}
	
	public function toError() {
		
	}
}
