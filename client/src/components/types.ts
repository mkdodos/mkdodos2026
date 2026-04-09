// 定義交易類型
export type TradeType = "Buy" | "Sell" | "Dividend";

// 交易紀錄的結構
export interface StockTrade {
  id?: number;
  trade_date: string;
  stock_code: string;
  trade_type: TradeType;
  quantity: number;
  unit_price: number;
  total_amount: number;
  created_at?: string;
}

// 庫存項目的結構 (由後端 SUM 計算後傳回)
export interface InventoryItem {
  stock_code: string;
  current_shares: number;
  net_cash_flow: string; // PostgreSQL 的 NUMERIC 傳到前端通常是 string
}
