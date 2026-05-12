--  庫存表
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