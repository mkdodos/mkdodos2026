-- 1. 啟動 UUID 擴充功能 (如果尚未啟動)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. 建立庫存表 (存放母材與切剩的餘料)
CREATE TABLE workpiece_inventory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    serial_number VARCHAR(100) UNIQUE,      -- 條碼或編號 (不可重複)
    outer_diameter DECIMAL(10, 2) NOT NULL, -- 外徑
    length DECIMAL(10, 2) NOT NULL,         -- 長度
    
    -- 自關聯：指向這筆餘料是從哪個 ID 切出來的
    parent_id UUID REFERENCES workpiece_inventory(id) ON DELETE SET NULL,
    
    -- 狀態：available (在庫), consumed (已切完), scrap (報廢/長度太短)
    status VARCHAR(20) DEFAULT 'available',
    
    -- 備註 (例如記錄材質或供應商)
    note TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. 建立需求表 (存放訂單或生產任務)
CREATE TABLE cutting_requirements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    outer_diameter DECIMAL(10, 2) NOT NULL,
    length DECIMAL(10, 2) NOT NULL,
    quantity INTEGER DEFAULT 1,
    priority INTEGER DEFAULT 1,             -- 優先順序 (數字越小越優先)
    
    -- 紀錄狀態：pending (待切割), completed (已完成)
    order_status VARCHAR(20) DEFAULT 'pending',
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. 建立切割日誌 (紀錄切割行為與鏈結)
CREATE TABLE cutting_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_inventory_id UUID REFERENCES workpiece_inventory(id), -- 拿哪根料來切
    requirement_id UUID REFERENCES cutting_requirements(id),     -- 為了滿足哪個需求
    
    cut_length DECIMAL(10, 2) NOT NULL,         -- 切掉的長度
    remaining_length DECIMAL(10, 2) NOT NULL,   -- 切完當下剩餘的長度
    
    executed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. 建立索引 (提升演算法搜尋效率)
-- 針對外徑與長度建立複合索引，這是 BFD 演算法最常搜尋的欄位
CREATE INDEX idx_workpiece_od_len ON workpiece_inventory (outer_diameter, length) 
WHERE status = 'available';

-- 針對 parent_id 建立索引，方便回溯母材
CREATE INDEX idx_workpiece_parent_id ON workpiece_inventory (parent_id);