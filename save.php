<?php

  if (isset ($_GET['firstname']) && isset ($_GET['lastname']) && isset ($_GET['age']) && is_numeric($_GET['age'])) {
    
    include_once ("db_connect.php");
  
    if ($link->connect_errno) {
      echo "Не удалось подключиться к базе данных: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
    }
    $firstname = $_GET['firstname'];
    $lastname = $_GET['lastname'];
    $age=floor(intval($_GET['age']));

    $result = $link->query("
    INSERT INTO `people` (`id`, `firstname`, `lastname`, `age`, `timestamp`) 
    VALUES (NULL, '{$firstname}', '{$lastname}', {$age}, current_timestamp())
    ");

    include_once ("db_close.php");
  } else {
    $result = "Не верные данные";
  }

  echo $result;

