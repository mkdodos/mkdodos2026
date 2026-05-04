const schemaMap = [
  {
    accessTable: "Stocks",
    pgTable: "stocks",
    // 格式： { "PG 欄位名": "Access 欄位名" }
    columns: {
      circle1: "Circle",
      note_text: "NoteText",
    },
  },
  {
    accessTable: "StockNeed",
    pgTable: "stock_need",
    // 格式： { "PG 欄位名": "Access 欄位名" }
    columns: {
      emp_id: "empID",
    },
  },
  // {
  //   accessTable: "員工基本資料",
  //   pgTable: "employees",
  //   columns: {
  //     emp_id: "工作人員編號",
  //     emp_name: "姓名",
  //   },
  //   dateFields: [],
  // },
  // {
  //   accessTable: "費用表",
  //   pgTable: "fees",
  //   columns: {
  //     fee_date: "日期",
  //     fee_name: "品名",
  //   },
  //   dateFields: ["fee_date"], // 額外標記哪些欄位是日期
  // },
  // {
  //   accessTable: "進貨表",
  //   pgTable: "works",
  //   columns: {
  //     work_id: "工作單號",
  //     in_date: "入廠日",
  //     in_qty: "入廠數量",
  //     work_name: "品名",
  //   },
  //   dateFields: ["in_date"], //
  // },
  // {
  //   accessTable: "客戶資料",
  //   pgTable: "customers",
  //   columns: {
  //     cust_id: "客戶編號",
  //     cust_name: "客戶名稱",
  //   },
  //   dateFields: [], //
  // },
];

module.exports = schemaMap;
