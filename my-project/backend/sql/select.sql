 SELECT 
    f.fund_id, 
    s.stock_no,      -- 從 stocks 表取得代號
    s.stock_name,    -- 從 stocks 表取得名稱
    SUM(CASE WHEN f.side = 'B' THEN f.qty ELSE -f.qty END) AS total_qty
FROM funds f
INNER JOIN stock_master s ON f.fund_id = s.id  -- 連結條件：基金ID等於股票表的主鍵ID
GROUP BY f.fund_id, s.stock_no, s.stock_name
HAVING SUM(CASE WHEN f.side = 'B' THEN f.qty ELSE -f.qty END) > 0
ORDER BY f.fund_id;


-- SELECT * FROM funds
-- SELECT * from stock_master


-- SELECT * FROM stock_transactions

-- 計算單一庫存
-- SELECT SUM(CASE WHEN side = 'B' THEN quantity ELSE -quantity END) as current_holding
-- FROM stock_transactions
-- WHERE stock_id = '2330';

-- 計算所有庫存


-- SELECT 
--     fund_id, 
--     SUM(CASE WHEN side = 'B' THEN qty ELSE -qty END) AS total_qty
-- FROM funds
-- GROUP BY fund_id
-- HAVING SUM(CASE WHEN side = 'B' THEN qty ELSE -qty END) > 0
-- ORDER BY fund_id;


-- SELECT 
--     stock_id, 
--     SUM(CASE WHEN side = 'B' THEN quantity ELSE -quantity END) AS total_inventory
-- FROM stock_transactions
-- GROUP BY stock_id
-- HAVING SUM(CASE WHEN side = 'B' THEN quantity ELSE -quantity END) > 0
-- ORDER BY stock_id;