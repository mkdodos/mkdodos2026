// utils/db-helper.js
const db = require("../db");

const helper = {
  // 取得所有資料
  async getAll(tableName, orderBy = "id DESC") {
    const { rows } = await db.query(
      `SELECT * FROM ${tableName} ORDER BY ${orderBy}`,
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
  async update(tableName, id, data) {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const setQuery = keys.map((key, i) => `${key} = $${i + 1}`).join(", "); // "name=$1, sort=$2"

    const sql = `UPDATE ${tableName} SET ${setQuery} WHERE id = $${keys.length + 1} RETURNING *`;
    const { rows } = await db.json(sql, [...values, id]);
    return rows[0];
  },

  // 刪除資料
  async delete(tableName, id) {
    await db.query(`DELETE FROM ${tableName} WHERE id = $1`, [id]);
    return true;
  },
};

module.exports = helper;
