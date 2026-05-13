
TRUNCATE TABLE wp_stock RESTART IDENTITY CASCADE;

INSERT INTO wp_stock (sn, od, len, status)

-- s.val：這是 generate_series 產生的 1, 2, 3...。加入它後，可以區分「同一列舊資料拆分出來」的多支工件。

SELECT 
    -- 語法：規格 + 原表ID + 拆分序號
    -- LPAD 補零
    'SN-' || LPAD(old.id::text, 3, '0') || '-' || LPAD(s.val::text, 2, '0'),
    -- 'SN-' || old.id || '-' || s.val, 
    old.od, 
    old.len, 
    'available'
FROM 
    old_stock old,
    LATERAL generate_series(1, old.qty) AS s(val);



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