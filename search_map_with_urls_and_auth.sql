use mosskey;

SELECT 
  Taxa.Name, 
  taxa.id,
  URL.name as url,
  authority.name as auth
FROM taxa
LEFT JOIN url ON taxa.urlid = url.id
LEFT JOIN authority on taxa.authorityid = authority.id 
JOIN map ON (map.TaxaId = taxa.id  AND
  Map.KeyCharacterId IN ('5','4','22'))
GROUP BY Taxa.Id;

/* use to build search_map results */
SELECT 
  Taxa.Name, 
  taxa.id,
  URL.name as url
FROM taxa
LEFT JOIN url ON taxa.urlid = url.id
JOIN map ON (map.TaxaId = taxa.id  AND
  Map.KeyCharacterId IN ('5','4','22'))
GROUP BY Taxa.Id;

/* use for taxa description page */
SELECT taxa.name,
  authority.name as auth,
  taxa.description as descr,
  taxa.timestamp as taxa_timestamp,
  url.name as url,
  url.type,
  url.timestamp as URL_timestamp
FROM taxa
LEFT JOIN url ON taxa.urlid = url.id
LEFT JOIN authority on taxa.authorityid = authority.id
WHERE taxa.id=4;
  
