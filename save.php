<?php

    if (isset ($_POST['firstname']) && isset ($_POST['lastname']) && isset ($_POST['age']) && is_numeric($_POST['age'])) {
        include_once 'db_connect.php';
        
        $firstname = $link->real_escape_string($_POST['firstname']);
        $lastname = $link->real_escape_string($_POST['lastname']);
        $age = floor(intval($_POST['age']));

        $result = $link->query("
        INSERT INTO `people` (`id`, `firstname`, `lastname`, `age`, `timestamp`) 
        VALUES (NULL, '{$firstname}', '{$lastname}', {$age}, current_timestamp())
        ");

        include_once 'db_close.php';
        echo $result;
    }
