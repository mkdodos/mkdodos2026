# postgres 資料庫
# 資料表欄位型別

SERIAL PRIMARY KEY
VARCHAR(10)
BOOLEAN
TIMESTAMP
DECIMAL(15, 2)
INTEGER
SMALLINT

輸入下列指令後,會提示輸入密碼,此指令作用為將 dump 出來的 local_backup.sql
匯入至 supabase

```shell
.\psql -h aws-1-ap-southeast-1.pooler.supabase.com -p 5432 -U postgres.wqekyprbtdtepxmrxbae -d postgres -f "D:\Dev\local_backup.sql"
```
在測試階段,每次匯入前,可以在 supabase 控制台 - SQL Editor
執行清除所有資料表

```sql
-- 1. 把整個 public 清掉（包含裡面所有的 Tables、Views、Sequences）
DROP SCHEMA public CASCADE;

-- 2. 重新建立一個乾淨、空的 public
CREATE SCHEMA public;
```

pd_dump,psql 都位在此資料夾
C:\Program Files\PostgreSQL\18\bin

執行資料備份
```shell
 .\pg_dump -U postgres -d mkdodos -f "D:\Dev\local_backup.sql" --no-owner --no-privileges

 pg_dump -U 本地資料庫用戶名 -d 本地資料庫名稱 -f "路徑檔名" --no-owner --no-privileges
 ```