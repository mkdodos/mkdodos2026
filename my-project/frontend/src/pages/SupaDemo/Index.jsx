import React, { useEffect } from "react";
import { supabase } from "./supabaseClient";

function Index() {
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("funds").select("*");
      if (error) console.log("連線失敗:", error);
      else console.log("連線成功，資料內容:", data);
    };
    fetchData();
  }, []);

  const handleInsert = async () => {
    // 💡 核心 Insert 語法
    const { data, error } = await supabase
      .from("funds") // 指定資料表
      .insert([
        { fund_id: "123" }, // 欄位名稱 : 資料值
      ])
      .select(); // 加上 .select() 會在新增成功後回傳該筆新資料（含自動生成的 id）

    if (error) {
      console.error("新增失敗:", error.message);
      alert("新增失敗: " + error.message);
    } else {
      console.log("新增成功，新資料為:", data);
      alert("資料已成功寫入資料庫！");
    }
  };

  const handleDelete = async (id) => {
    const { data, error } = await supabase
      .from("funds") // 指定資料表
      .delete() // 宣告要執行刪除
      .eq("id", id) // 💡 關鍵：條件是當 id 等於傳入的 id 時
      .select(); // 選配：加上 .select() 可以回傳被刪除的那筆資料內容

    if (error) {
      console.error("刪除失敗:", error.message);
    } else {
      console.log("成功刪除資料:", data);
      // 這裡通常會接著更新 React 的 state，讓畫面上的該筆資料消失
    }
  };

  return (
    <div>
      <button onClick={handleInsert}>新增資料</button>
      <button onClick={() => handleDelete(4)}>刪除資料</button>
    </div>
  );
}

export default Index;
