-- 投資配置表：設定每月固定執行的任務
-- CREATE TABLE investment_tasks (
--     task_id SERIAL PRIMARY KEY,
--     stock_no VARCHAR(10), -- 例如 2330
--     buy_day_of_month INTEGER, -- 1-31    
--     amount DECIMAL(10, 2),
--     is_enabled BOOLEAN DEFAULT TRUE
-- );

-- 投資主表 (Investment)
CREATE TABLE inv_tasks (
    id SERIAL PRIMARY KEY,
    stock_no VARCHAR(10) NOT NULL,
    is_enabled BOOLEAN DEFAULT TRUE,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- 投資明細(扣款時程 Schedule)
-- ON DELETE CASCADE 主表刪除時,同時刪除相關記錄
CREATE TABLE inv_scheds (
    id SERIAL PRIMARY KEY,
    task_id INTEGER REFERENCES inv_tasks(id) ON DELETE CASCADE,
    buy_day INTEGER CHECK (buy_day BETWEEN 1 AND 31),
    amt DECIMAL(15, 2) NOT NULL -- Amount 簡寫為 amt
);

-- updated_at 用途
-- 找出最近三天內調整過的投資計畫
-- SELECT * FROM inv_tasks 
-- WHERE updated_at >= CURRENT_DATE - INTERVAL '3 days'
-- ORDER BY updated_at DESC;


-- 1. 建立一個更新時間的函數
-- 每次改 stock_no 或 is_enabled，updated_at 就會自動變成最新的時間
-- CREATE OR REPLACE FUNCTION update_modified_column()
-- RETURNS TRIGGER AS $$
-- BEGIN
--     NEW.updated_at = now();
--     RETURN NEW;
-- END;
-- $$ language 'plpgsql';

-- -- 2. 幫 inv_tasks 表建立觸發器
-- CREATE TRIGGER update_inv_tasks_modtime
-- BEFORE UPDATE ON inv_tasks
-- FOR EACH ROW
-- EXECUTE PROCEDURE update_modified_column();




