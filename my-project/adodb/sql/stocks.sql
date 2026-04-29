DROP TABLE IF EXISTS stocks_abc;

CREATE TABLE stocks_abc (
    id SERIAL PRIMARY KEY,           -- 自動遞增的 ID
    circle1 VARCHAR(255) ,      -- 標題 (必填)
    note_text VARCHAR(255) ,                    -- 內容 (可選)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- 建立時間
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- 更新時間
);