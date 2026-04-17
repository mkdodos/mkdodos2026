SELECT 
    items.id,
    items.item_name,
    boxes.name
FROM items
INNER JOIN boxes ON items.box_id = boxes.id;