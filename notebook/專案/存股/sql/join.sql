-- inv_stocks.stock_no
-- inv_tasks.stock_no
-- inv_tasks.id
-- inv_scheds.task_id



SELECT 
    inv_stocks.stock_name,inv_scheds.buy_day,
    inv_scheds.amt
FROM inv_stocks
INNER JOIN inv_tasks ON inv_stocks.stock_no = inv_tasks.stock_no
INNER JOIN inv_scheds ON inv_tasks.id = inv_scheds.task_id;


-- SELECT t.id,t.is_enabled ,t.stock_no,s.stock_name FROM inv_tasks t
-- JOIN inv_stocks s ON t.stock_no = s.stock_no


