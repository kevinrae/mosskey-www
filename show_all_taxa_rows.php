<?php 
require_once 'config.php';

$sql = "SELECT Taxa.Name, Taxa.id FROM Taxa GROUP BY Taxa.id;";

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

mysqli_close($conn);

?>
