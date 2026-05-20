-- ALTER TABLE wp_stock 
-- ALTER COLUMN sn DROP NOT NULL;


ALTER TABLE wp_stock 
ADD COLUMN demand_id INTEGER REFERENCES wp_demand(id);