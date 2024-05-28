<?php
    $res = shell_exec ("git pull");
    if ($res == false) {
        echo ('Deu PT <br>');
        echo (exec ('whoami'));
    }
    else if ($res == null) {
        echo ('Também deu PT <br>');
        echo (exec ('whoami'));
    }
    else {
        echo ('Tudo ok <br>');
        echo ($res);
    }
?>