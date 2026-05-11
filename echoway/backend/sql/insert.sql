-- INSERT INTO workpiece_inventory (outer_diameter, length, status, parent_id)
-- VALUES 
-- ( 50, 6000, 'available', NULL),
-- ( 50, 3000, 'available', NULL),
-- ( 80, 6000, 'available', NULL);


INSERT INTO cutting_requirements (outer_diameter, length, quantity)
VALUES 
(50, 1200, 2), -- 需要兩根 1200mm 的 50 外徑工件
(50, 800, 1);  -- 需要一根 800mm 的 50 外徑工件