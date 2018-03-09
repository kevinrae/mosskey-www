<?php
//http://stackoverflow.com/questions/2105375/how-should-i-write-php-post-vars-in-a-mysql-query-function
require_once 'config.php';

$ids = $_POST['idArray'];
if($ids) {
  
  $num_of_ids = count($ids);
  $string_of_ids = implode(',',$ids);

  $sql  = "SELECT taxa.Name, taxa.id 
           FROM (SELECT taxa.Name, taxa.id FROM taxa) taxa 
           JOIN 
           (SELECT Map.TaxaId FROM Map WHERE Map.KeyCharacterId IN ($string_of_ids)
            GROUP BY TaxaId HAVING COUNT( DISTINCT Map.KeyCharacterId ) = $num_of_ids ) Map
           WHERE Map.TaxaId = taxa.id;";

//  echo "sql string: ". $sql; 

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
  mysqli_close($conn);
?>
