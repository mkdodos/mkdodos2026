```sql
-- 切割日誌 (紀錄切割行為與鏈結)
CREATE TABLE wp_cut_logs (
    id SERIAL PRIMARY KEY,
    stock_id INTEGER NOT NULL, -- 拿哪根料來切
    demand_id INTEGER REFERENCES wp_demand(id),     -- 為了滿足哪個需求
    cut_len SMALLINT NOT NULL,         -- 切掉的長度
    remain_len SMALLINT NOT NULL,   -- 切完當下剩餘的長度
    executed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

```sql
-- REFERENCES 關聯至 資料表名稱(欄位名稱)
demand_id INTEGER REFERENCES wp_demand(id)
```
