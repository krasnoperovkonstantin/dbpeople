<?php

    $link = new mysqli("127.0.0.1", "root", "root", "db");
    if ($link->connect_errno) {
        echo 'Не удалось подключиться к MySQL: ('.$mysqli->connect_errno.') '.$mysqli->connect_error;
        exit;
    }
