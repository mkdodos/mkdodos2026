 WITH RECURSIVE family_tree AS (
        SELECT id, sn, od, len, parent_id, 1 AS level
        FROM wp_stock
        WHERE parent_id IS NULL AND id = ${req.params.id}

        UNION ALL

        SELECT t.id, t.sn, t.od, t.len, t.parent_id, ft.level + 1
        FROM family_tree ft
        JOIN wp_stock t ON t.parent_id = ft.id
      )
      SELECT 
        id, 
        repeat(' | ', level - 1) || sn AS tree_structure, 
        len, 
        level
      FROM family_tree;