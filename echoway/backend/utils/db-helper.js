// utils/db-helper.js
const db = require("../db");

const helper = {
  // 取得所有資料
  async getAll(tableName, orderBy = "id DESC") {
    const { rows } = await db.query(
      `SELECT * FROM ${tableName} ORDER BY ${orderBy} LIMIT 1000`,
    );
    return rows;
  },

  // 新增資料 (自動處理欄位對應與防止 SQL 注入)
  async create(tableName, data) {
    const keys = Object.keys(data); // ['cate_name', 'sort']
    const values = Object.values(data); // ['新分類', 1]
    const placeholders = keys.map((_, i) => `$${i + 1}`).join(", "); // "$1, $2"

    const sql = `
      INSERT INTO ${tableName} (${keys.join(", ")}) 
      VALUES (${placeholders}) 
      RETURNING *`;

    const { rows } = await db.query(sql, values);
    return rows[0];
  },

  // 更新資料
  // 更新資料
  async update(tableName, id, data) {
    const keys = Object.keys(data);
    const values = Object.values(data);

    // 1. 動態生成 "name = $1, sort = $2"
    const setQuery = keys.map((key, i) => `${key} = $${i + 1}`).join(", ");

    // 2. 將 id 追加到參數陣列的最後一個位置，對應 $${keys.length + 1}
    const queryValues = [...values, id];

    // 3. 組裝 SQL 語句
    const sql = `UPDATE ${tableName} SET ${setQuery} WHERE id = $${queryValues.length} RETURNING *`;

    // 4. 執行並回傳更新後的資料
    const { rows } = await db.query(sql, queryValues);
    return rows[0]; // 回傳更新後的那筆資料物件
  },

  // 刪除資料
  async delete(tableName, id) {
    await db.query(`DELETE FROM ${tableName} WHERE id = $1`, [id]);
    return true;
  },
};

module.exports = helper;
