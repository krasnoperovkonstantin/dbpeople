<?php
    include_once ("db_connect.php");
  
    if ($link->connect_errno) {
        $result = "Не удалось подключиться к базе данных: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
    } 
    else {
  
      $result = $link->query("
      SELECT firstname, lastname, age 
      FROM people
      WHERE age > 18
      ");

      $result = json_encode(mysqli_fetch_all($result,MYSQLI_ASSOC));

      include_once ("db_close.php");
    }
    echo $result;
