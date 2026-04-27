DROP TABLE IF EXISTS works;
CREATE TABLE works (
    id SERIAL PRIMARY KEY,           
    work_id VARCHAR(255) ,  --工作單號,
    work_name VARCHAR(255) ,  --品名
    in_date Date ,  --    
    in_qty SMALLINT,  --入廠數量
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- 建立時間
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- 更新時間
);