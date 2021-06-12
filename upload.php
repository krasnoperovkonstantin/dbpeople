<?php

    include_once 'db_connect.php';
  
    $result = $link->query('
    SELECT firstname, lastname, age 
    FROM people
    WHERE age > 18
    ');

    $result = json_encode(mysqli_fetch_all($result, MYSQLI_ASSOC));

    include_once 'db_close.php';

    echo $result;
