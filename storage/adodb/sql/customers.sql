CREATE TABLE customers (
    id SERIAL PRIMARY KEY,           -- 自動遞增的 ID
    cust_id VARCHAR(255) NOT NULL,      -- 標題 (必填)
    cust_name VARCHAR(255) NOT NULL,                    -- 內容 (可選)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- 建立時間
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- 更新時間
);