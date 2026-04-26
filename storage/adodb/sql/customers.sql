DROP TABLE IF EXISTS customers;
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,           
    cust_id VARCHAR(255) NOT NULL,      
    cust_name VARCHAR(255) NOT NULL,   
    tel VARCHAR(50),                
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- 建立時間
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- 更新時間
);