<?php
//http://stackoverflow.com/questions/2105375/how-should-i-write-php-post-vars-in-a-mysql-query-function
require_once 'config.php';

$ids = $_POST['idArray'];
if($ids) {

  $string_of_ids = implode(',',$ids);

  $sql = "SELECT Taxa.Name, Taxa.id, Map.KeyCharacterId FROM Taxa, Map WHERE Map.TaxaId = Taxa.id AND Map.KeyCharacterId IN ($string_of_ids) GROUP BY Taxa.id;";

  $result = mysqli_query($conn, $sql);

  if(mysqli_num_rows($result) != 0){ //results found
    while($row = mysqli_fetch_assoc($result)) {
      $row_array[] = $row;
    }

    $json_payload = json_encode($row_array);
//    echo "ids: ".$string_of_ids;
//    echo "sql: ".$sql;
//    echo "displaymatches(".$json_payload.");";
    echo "$json_payload";
  } else { //no results
    echo "NULL";
  }

} else {
  echo "NULL";
}
//echo "myFUNC(".$json_payload.");";
//echo "parsetree(".$json_payload.");";

  mysqli_close($conn);

?>
