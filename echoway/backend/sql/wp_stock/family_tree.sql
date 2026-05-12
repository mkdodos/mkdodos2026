-- 向下展開：從「母材」看所有「切割出的餘料」


WITH RECURSIVE family_tree AS (
    -- 1. 起點：選定原始母材
    SELECT id, sn, od, len, parent_id, 1 AS level
    FROM wp_stock
    WHERE parent_id IS NULL AND id = 1

    UNION ALL

    -- 2. 遞迴：找所有子層（誰的 parent_id 是我）
    SELECT t.id, t.sn, t.od, t.len, t.parent_id, ft.level + 1
    FROM family_tree ft
    JOIN wp_stock t ON t.parent_id = ft.id
)
-- 3. 輸出結果，利用 level 做縮排視覺化
SELECT 
    id, 
    repeat(' | ', level - 1) || sn AS tree_structure, 
    len, 
    level
FROM family_tree;


