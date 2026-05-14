--  庫存表
DROP TABLE IF EXISTS old_stock;
CREATE TABLE old_stock (    
    id SERIAL PRIMARY KEY,     
    old_id INTEGER,   --  原資料ID   
    od NUMERIC(10, 2) NOT NULL,    -- 外徑 (Outer Diameter)
    len NUMERIC(10, 2) NOT NULL,   -- 長度 (Length)
    qty INTEGER  
   
);