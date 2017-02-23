<?php
require_once 'config.php';

$sql = 'SELECT name, lft, rht, id FROM KeyCharacter;';

$result = mysqli_query($conn, $sql);

while($row = mysqli_fetch_assoc($result)) {
   $row_array[] = $row;
}

$json_payload = json_encode($row_array);
echo "myFUNC(".$json_payload.");";

mysqli_close($conn);
?>  
