-- 查某一筆的往下所有層級：
-- WITH RECURSIVE stock_tree AS (
--   -- 起點：指定從哪一筆開始
--   SELECT id, parent_id, 0 AS level
--   FROM wp_stock
--   WHERE id = 374          -- ← 指定起始 id

--   UNION ALL

--   SELECT s.id, s.parent_id, st.level + 1
--   FROM wp_stock s
--   JOIN stock_tree st ON s.parent_id = st.id
-- )
-- SELECT * FROM stock_tree;

-- 查某一筆的往上所有層級
WITH RECURSIVE stock_tree AS (
  SELECT id, parent_id, 0 AS level
  FROM wp_stock
  WHERE id = 382          -- ← 從這筆往上找

  UNION ALL

  SELECT s.id, s.parent_id, st.level + 1
  FROM wp_stock s
  JOIN stock_tree st ON s.id = st.parent_id  -- ← 反向關聯
)
SELECT * FROM stock_tree;


-- 向上溯源：從「餘料」找回「原始母材」

-- WITH RECURSIVE material_history AS (
--     -- 1. 起點：選定那塊小餘料
--     SELECT id, sn, od, len, parent_id, 0 AS depth
--     FROM wp_stock
--     WHERE id = 2  -- 假設 3 是那塊 R2 餘料

--     UNION ALL

--     -- 2. 遞迴：透過 parent_id 一層一層往上爬
--     SELECT t.id, t.sn, t.od, t.len, t.parent_id, mh.depth + 1
--     FROM wp_stock t
--     INNER JOIN material_history mh ON t.id = mh.parent_id
-- )
-- -- 3. 輸出結果（depth 越大代表越祖先）
-- SELECT * FROM material_history ORDER BY depth DESC;