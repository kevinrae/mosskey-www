<?php
require_once 'config.php';

$sql = 'SELECT name, lft, rht, id FROM KeyCharacter;';

//$sql = 'SELECT CONCAT( REPEAT(" ", COUNT(parent.name) - 1), node.name) AS name FROM KeyCharacter AS node, KeyCharacter AS parent WHERE node.lft BETWEEN parent.lft AND parent.rht GROUP BY node.name ORDER BY node.lft;';

//echo "<table>";
$result = mysqli_query($conn, $sql);

//if (mysqli_num_rows($result) > 0) {
  while($row = mysqli_fetch_assoc($result)) {
         // is leaf node?
         // has children?
//         echo "<tr><td>". $row["name"] . "</td><td>". $row["lft"] . "</td><td>". $row["rht"] . "</td></tr>";
//         echo "<tr><td><pre>". $row["name"] . "</pre></td><td>";
//     }
//} else {
//     echo "0 results";
   $row_array[] = $row;

}
//echo "</table>";
$json_payload = json_encode($row_array);
echo "myFUNC(".$json_payload.");";


mysqli_close($conn);
?>  
