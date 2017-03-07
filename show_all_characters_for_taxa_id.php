<?php
//http://stackoverflow.com/questions/2105375/how-should-i-write-php-post-vars-in-a-mysql-query-function
require_once 'config.php';

$id = mysqli_real_escape_string($conn, $_POST['id']);
if($id) {
//  echo "$id";
  $sql = "select keycharacter.name FROM map, keycharacter WHERE map.keycharacterID=keycharacter.id AND map.TaxaId=$id;";

  $result = mysqli_query($conn, $sql);

  if(mysqli_num_rows($result) != 0){ //results found
    while($row = mysqli_fetch_assoc($result)) {
      $row_array[] = $row;
    }
    $json_payload = json_encode($row_array);
    echo "$json_payload";
  } else { //no results
    echo "NULL";
  }

} else { //post not set
  echo "P";
}

  mysqli_close($conn);
?>

