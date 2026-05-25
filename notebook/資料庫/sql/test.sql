WITH params AS (
    -- 在這裡修改您的測試參數值
    SELECT 
        50 AS req_outer_diameter, 
        120 AS req_length
)
SELECT 
    i.id, 
    i.od, 
    i.len, 
    (i.len - p.req_length) AS waste
FROM wp_stock i, params p
WHERE i.od = p.req_outer_diameter 
  AND i.len >= p.req_length
ORDER BY i.len ASC
LIMIT 1;