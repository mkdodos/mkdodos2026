SELECT * FROM funds


-- SELECT * FROM stock_transactions

-- 計算庫存
-- SELECT SUM(CASE WHEN side = 'B' THEN quantity ELSE -quantity END) as current_holding
-- FROM stock_transactions
-- WHERE stock_id = '2330';


-- SELECT 
--     stock_id, 
--     SUM(CASE WHEN side = 'B' THEN quantity ELSE -quantity END) AS total_inventory
-- FROM stock_transactions
-- GROUP BY stock_id
-- HAVING SUM(CASE WHEN side = 'B' THEN quantity ELSE -quantity END) > 0
-- ORDER BY stock_id;