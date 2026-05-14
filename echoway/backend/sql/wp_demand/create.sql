CREATE TABLE wp_demand (
    id SERIAL PRIMARY KEY,
    order_no VARCHAR(50),               -- 訂單編號或工單號
    od NUMERIC(10, 2) NOT NULL,         -- 目標外徑
    wall_thickness NUMERIC(10, 2),      -- 厚度 (如有需要)
    len NUMERIC(10, 2) NOT NULL,        -- 目標長度
    qty INTEGER NOT NULL DEFAULT 1,     -- 需要的數量
    priority INTEGER DEFAULT 1,         -- 優先順序 (1:普通, 5:最急)
    status VARCHAR(20) DEFAULT 'pending', -- 狀態: pending(待處理), processing(切割中), completed(已完成)
    due_date DATE,                      -- 交期
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);