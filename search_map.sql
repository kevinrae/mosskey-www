use mosskey;
SELECT Taxa.Name, Taxa.id, Map.KeyCharacterId FROM Taxa, Map WHERE 
Map.TaxaId = Taxa.id AND
Map.KeyCharacterId IN ('3','4','5');