SELECT 
    d.*, 
    -- 即時統計 stock 表中，歸屬於此需求且狀態為成品的數量
    (SELECT COUNT(*) 
     FROM wp_stock s 
     WHERE s.demand_id = d.id AND s.status = 'product') AS completed
FROM wp_demand d;