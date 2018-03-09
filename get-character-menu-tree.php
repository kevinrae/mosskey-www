<?php

require_once 'config.php';

/*

$sql = "select a.name, lft, rht, id, depth, IFNULL(matches,0) AS matches FROM
(SELECT node.name, node.lft, node.rht, node.id, (COUNT(parent.name) - 1) AS depth
  FROM KeyCharacter AS node,
     KeyCharacter AS parent
  WHERE node.lft BETWEEN parent.lft AND parent.rht
  GROUP BY node.name
  HAVING depth >= 1
  ORDER BY node.lft) a
LEFT JOIN
  (select keycharacter.name, count(map.TaxaId) AS matches
  FROM map, keycharacter WHERE map.keycharacterID=keycharacter.id
  GROUP BY keycharacter.name) b
  ON a.name = b.name;";
*/

$sql = "select a.Name, lft, rht, id, depth, 
  IFNULL(matches,0) AS matches, 
  IFNULL(isEye,0) AS isEye, 
  IFNULL(isHandLens,0) AS isHandLens, 
  IFNULL(isScope,0) AS isScope FROM
(SELECT node.Name, node.lft, node.rht, node.id, (COUNT(parent.Name) - 1) AS depth, node.isEye, node.isHandLens, node.isScope
  FROM KeyCharacter AS node,
     KeyCharacter AS parent
  WHERE node.lft BETWEEN parent.lft AND parent.rht
  GROUP BY node.Name
  HAVING depth >= 1
  ORDER BY node.lft) a
LEFT JOIN
  (select KeyCharacter.Name, count(Map.TaxaId) AS matches
  FROM Map, KeyCharacter WHERE Map.KeyCharacterId=KeyCharacter.id
  GROUP BY KeyCharacter.Name) b
  ON a.Name = b.Name;";


$result = mysqli_query($conn, $sql);

//is node a leaf?

//does node have children?
//if so, store the right value of the node in a stack
// all children.rht < parent.rht
// when node.rht = parent.rht remove value from stack

while($row = mysqli_fetch_assoc($result)) {
  $row_array[] = $row;
}

$json_payload = json_encode($row_array);
//echo $json_payload;
//echo "myFUNC(".$json_payload.");";
echo "parsetree(".$json_payload.");";

mysqli_close($conn);
?>  

