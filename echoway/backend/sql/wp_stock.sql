--  庫存表 (使用 IDENTITY 代替 SERIAL，這是符合 SQL 標準的現代寫法)
DROP TABLE wp_stock;
CREATE TABLE wp_stock (
    -- 1. 內部唯一識別碼
    id SERIAL PRIMARY KEY,

    -- 2. 外部顯示序號 (加 UNIQUE 約束，防止編號重複)
    sn VARCHAR(50) NOT NULL CONSTRAINT unique_sn UNIQUE,

    -- 3. 規格欄位 (使用 NUMERIC 確保精準度，避免浮點數誤差)
    od NUMERIC(10, 2) NOT NULL,    -- 外徑 (Outer Diameter)
    len NUMERIC(10, 2) NOT NULL,   -- 長度 (Length)

    -- 4. 溯源欄位 (指向同表中的 id，建立父子關係)
    parent_id INTEGER REFERENCES wp_stock(id) ON DELETE SET NULL,

    -- 5. 狀態與記錄
    status VARCHAR(20) DEFAULT 'available', -- available (在庫), consumed (已切完)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 為常用搜尋欄位建立索引，加快查詢速度
CREATE INDEX idx_wp_stock_sn ON wp_stock(sn);
CREATE INDEX idx_wp_stock_parent ON wp_stock(parent_id);


-- INSERT INTO wp_stock (od, len, status, parent_id)
-- VALUES 
-- ( 50, 6000, 'available', NULL),
-- ( 50, 3000, 'available', NULL),
-- ( 80, 6000, 'available', NULL);

SELECT * from wp_stock;