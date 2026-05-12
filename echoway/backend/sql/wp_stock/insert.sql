-- 1. 插入第一根原始母材 (6米長，外徑50)
INSERT INTO wp_stock (sn, od, len, parent_id, status)
VALUES ('M260512-001', 50.0, 6000.0, NULL, 'consumed'); 
-- 註：狀態設為 consumed，因為我們假設它已經被切過了

-- 2. 插入從第一根母材切剩下的「第一代餘料」 (假設切掉2000，剩下4000)
-- 這裡我們假設母材的 ID 是 1
INSERT INTO wp_stock (sn, od, len, parent_id, status)
VALUES ('M260512-001-R1', 50.0, 4000.0, 1, 'consumed');

-- 3. 插入從 R1 再切剩下的「第二代餘料」 (假設又切掉1500，剩下2500)
-- 這裡我們假設 R1 的 ID 是 2
INSERT INTO wp_stock (sn, od, len, parent_id, status)
VALUES ('M260512-001-R2', 50.0, 2500.0, 2, 'available');

-- 4. 插入另一根全新的母材 (備用，目前在庫)
INSERT INTO wp_stock (sn, od, len, parent_id, status)
VALUES ('M260512-002', 60.0, 6000.0, NULL, 'available');