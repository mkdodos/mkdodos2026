```sql
ALTER TABLE table_name
ALTER COLUMN column_name TYPE new_data_type;


-- 將 len 欄位從 INTEGER 改為 BIGINT
ALTER TABLE table_name
ALTER COLUMN len TYPE BIGINT;

-- 若需要型別轉換（例如 integer → varchar）
ALTER TABLE table_name
ALTER COLUMN len TYPE VARCHAR(50) USING len::VARCHAR;
```

