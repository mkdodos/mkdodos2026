CREATE TABLE funds (
    id SERIAL PRIMARY KEY,  -- ID
    fund_name  VARCHAR(50),             --股名
    in_date DATE,           -- 買入日期
    qty SMALLINT,           -- 股數
    price SMALLINT          -- 單價          
);