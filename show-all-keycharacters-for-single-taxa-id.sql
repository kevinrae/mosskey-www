use mosskey;
select keycharacter.name FROM map, keycharacter 
WHERE 
map.keycharacterID=keycharacter.id
AND
map.TaxaId=2; 
