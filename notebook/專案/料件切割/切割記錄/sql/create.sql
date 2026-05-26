DROP TABLE wp_cut_logs;
CREATE TABLE wp_cut_logs (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    stock_id INTEGER,
    demand_id INTEGER,
    cut_len INTEGER,
    remain_len INTEGER,
    executed_at TIMESTAMPTZ DEFAULT NOW()
)