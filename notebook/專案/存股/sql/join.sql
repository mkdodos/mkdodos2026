SELECT t.id,t.is_enabled ,t.stock_no,s.stock_name FROM inv_tasks t
JOIN inv_stocks s ON t.stock_no = s.stock_no