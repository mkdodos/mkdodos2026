-- SELECT * from old_stock WHERE qty>0
SELECT id,parent_id,sn from wp_stock
ORDER BY id DESC