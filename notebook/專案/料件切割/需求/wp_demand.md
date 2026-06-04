資料表

```sql
CREATE TABLE wp_demand (
    id SERIAL PRIMARY KEY,
    order_no VARCHAR(50),             -- 訂單編號或工單號
    od NUMERIC(10, 2) NOT NULL,         -- 目標外徑
    len SMALLINT NOT NULL,        -- 目標長度
    qty INTEGER NOT NULL DEFAULT 1,     -- 需要的數量
    wall_thickness NUMERIC(10, 2),      -- 厚度 (如有需要)
    priority INTEGER DEFAULT 1,         -- 優先順序 (1:普通, 5:最急)
    status VARCHAR(20) DEFAULT 'pending', -- 狀態: pending(待處理), processing(切割中), completed(已完成)
    due_date DATE,                    -- 交期 
);
```

- 點選某筆需求的預覽鈕,可查看符合的庫存
- 點擊確定後,將需求和庫存的相關資訊寫入**切割記錄**