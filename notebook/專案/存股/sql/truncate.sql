-- ALTER SEQUENCE inv_tasks_id_seq RESTART WITH 1;

-- TRUNCATE TABLE inv_scheds;
-- TRUNCATE TABLE inv_tasks;

-- 有關聯的資料表,一次清空
TRUNCATE TABLE inv_tasks, inv_scheds;