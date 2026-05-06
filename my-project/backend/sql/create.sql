DROP TABLE stock_master;
CREATE TABLE stock_master (
    id SERIAL PRIMARY KEY,           -- 代理鍵：自增整數，真正的 PK
    stock_no VARCHAR(20) UNIQUE NOT NULL, -- 自然鍵：股票代號 (如 2330)，設為唯一索引
    stock_name VARCHAR(100) NOT NULL,     -- 股票名稱
    created_at TIMESTAMP DEFAULT NOW()
);


-- CREATE TABLE stock_transactions (
--     id SERIAL PRIMARY KEY,
--     stock_id VARCHAR(10) NOT NULL,
--     side CHAR(1) CHECK (side IN ('B', 'S')), -- 強制只能存 B 或 S
--     quantity BIGINT NOT NULL,
--     price NUMERIC(12, 4) NOT NULL,    
--     trade_date TIMESTAMPTZ DEFAULT NOW(),
--     -- 小計：買入是錢減少(負)，賣出是錢增加(正)
--     total_amount NUMERIC(18, 2) GENERATED ALWAYS AS (
--         CASE 
--             WHEN side = 'B' THEN -(quantity * price) 
--             WHEN side = 'S' THEN (quantity * price) 
--         END
--     ) STORED
-- );


-- CREATE TABLE funds (
--     id SERIAL PRIMARY KEY,  -- ID
--     fund_name  VARCHAR(50),             --股名
--     in_date DATE,           -- 買入日期
--     qty SMALLINT,           -- 股數
--     price SMALLINT          -- 單價          
-- );