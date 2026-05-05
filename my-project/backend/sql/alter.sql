-- 欄位重新命名
-- ALTER TABLE funds 
-- RENAME COLUMN in_date TO trade_date;

ALTER TABLE funds  
ADD COLUMN side CHAR(1) CHECK (side IN ('B', 'S')); -- 強制只能存 B 或 S


-- ALTER TABLE funds 
-- ALTER COLUMN price TYPE numeric(12, 2);


-- ALTER TABLE funds 
-- ADD COLUMN subtotal NUMERIC(16, 2) 
-- GENERATED ALWAYS AS (qty * price) STORED;


-- 先刪除舊的（如果有），再新增含 ROUND 的欄位
-- ALTER TABLE funds DROP COLUMN IF EXISTS subtotal;


-- 自動隨著股數或單價更動而更新
-- STORED 代表會佔用實體磁碟空間以換取查詢速度
-- ALTER TABLE funds 
-- ADD COLUMN subtotal NUMERIC(16, 0) -- 0 代表不保留小數點，四捨五入到整數
-- GENERATED ALWAYS AS (ROUND(qty * price)) STORED;