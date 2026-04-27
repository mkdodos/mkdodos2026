DROP TABLE IF EXISTS fees;
CREATE TABLE fees (
    id SERIAL PRIMARY KEY,           
    fee_date VARCHAR(255) NOT NULL,  --日期    
    fee_name VARCHAR(255) NOT NULL,  --品名
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- 建立時間
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- 更新時間
);