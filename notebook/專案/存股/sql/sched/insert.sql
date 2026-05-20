


-- 為 2330 設定每月 5、15、25 號各買 5000 元
INSERT INTO inv_scheds (task_id, buy_day, amt) VALUES 
(1, 5, 5000.00),
(1, 15, 5000.00),
(1, 25, 5000.00);

-- 為 0050 設定每月 6 號買 10000 元
INSERT INTO inv_scheds (task_id, buy_day, amt) VALUES 
(2, 6, 10000.00);

-- 為 2317 設定每月 10 號買 3000 元（雖然主表關閉，但資料可以先存著）
INSERT INTO inv_scheds (task_id, buy_day, amt) VALUES 
(3, 10, 3000.00);