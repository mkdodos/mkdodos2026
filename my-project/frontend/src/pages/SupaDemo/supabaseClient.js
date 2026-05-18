import { createClient } from "@supabase/supabase-js";
// const supabaseUrl = "你的網址";
// const supabaseKey = "你的公開金鑰";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// 加上這行來除錯
console.log("檢查環境變數是否成功讀取：", { supabaseUrl, supabaseKey });

export const supabase = createClient(supabaseUrl, supabaseKey);
