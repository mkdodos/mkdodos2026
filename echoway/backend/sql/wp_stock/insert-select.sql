
TRUNCATE TABLE wp_stock RESTART IDENTITY CASCADE;

INSERT INTO wp_stock (sn, od, len, status,old_id)

-- s.val：這是 generate_series 產生的 1, 2, 3...。加入它後，可以區分「同一列舊資料拆分出來」的多支工件。


-- 建立一個名為 stock_sn_seq 的序列
-- CREATE SEQUENCE stock_sn_seq
--     START WITH 1      -- 從 1 開始
--     INCREMENT BY 1    -- 每次加 1
--     NO MAXVALUE;      -- 不設上限




SELECT 
    'D' || (t.od::INTEGER) || '-' || TO_CHAR(CURRENT_DATE, 'YYMMDD') || '-' || 
    LPAD(nextval('stock_sn_seq')::text, 3, '0'),
    t.od, 
    t.len, 
    'available',
    t.old_id
FROM (
    -- 先把資料全部炸開，再統一取號
    SELECT old.od, old.len,old.old_id
    FROM old_stock old ,
    LATERAL generate_series(1, old.qty) AS s(val)
) t;

-- SELECT     
--     -- LPAD 補零
--     'D' || (old.od::INTEGER) || '-' || TO_CHAR(CURRENT_DATE, 'YYMMDD') || '-' || LPAD(nextval('stock_sn_seq')::text, 3, '0'),   
--     old.od, 
--     old.len, 
--     'available',
--     old.old_id
-- FROM 
--     old_stock old,
--     LATERAL generate_series(1, old.qty) AS s(val);



-- INSERT INTO wp_stock (sn, od, len, status)
-- SELECT 
--     -- 產生格式：OD[外徑]-L[長度]-[序號]
--     'OD' || old.od || '-L' || old.len || '-' || s.val, 
--     old.od, 
--     old.len, 
--     'available'
-- FROM 
--     old_stock old,
--     LATERAL generate_series(1, old.qty) AS s(val);