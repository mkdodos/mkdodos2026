import React, { useState } from "react";
import { useData } from "./useData";
import TableView from "./TableView";
import EditForm from "./EditForm";
import { Button, Tag, Form, Input, Space } from "antd";
import { EditOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons"; // 建議加個圖示比較專業

function Index() {
  const { data, saveData, deleteData, setData, originalData } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [query, setQuery] = useState("");

  const [form] = Form.useForm();

  // values : 表單中輸入項的值
  const handleSave = async (values) => {
    console.log(values);
    // console.log(editingId);
    await saveData(values, editingId);
    setIsModalOpen(false);
  };

  const handleDelete = async () => {
    await deleteData(editingId);
    setIsModalOpen(false);
  };

  const handleAdd = () => {
    setIsModalOpen(true);
    // 呼叫 form.resetFields() 後，所有的欄位會回到 initialValues 設定的狀態
    form.resetFields();
    // form.setFieldsValue({
    //   is_enabled: true, // 手動指定 Switch 的值
    // });
    setEditingId(null);
  };

  const handleEdit = (record) => {
    setIsModalOpen(true);
    form.setFieldsValue(record);
    setEditingId(record.id);
  };

  const columns = [
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Button
          icon={<EditOutlined />}
          onClick={() => handleEdit(record)}
          type="text"
        />
      ),
    },
    {
      title: "id",
      dataIndex: "id",
    },
    {
      title: "parent_id",
      dataIndex: "parent_id",
    },
    {
      title: "sn",
      dataIndex: "sn",
    },
    {
      title: "od",
      dataIndex: "od",
      render: (value) => Number(value),
      // render: (value) => (value != null ? parseFloat(value) : ""),
      // render: (value) => (value != null ? Number(value) : ""),
    },
    {
      title: "len",
      dataIndex: "len",
    },
    {
      title: "status",
      dataIndex: "status",
    },
    {
      title: "demand_id",
      dataIndex: "demand_id",
    },
    {
      title: "old_id",
      dataIndex: "old_id",
    },
  ];

  const [params, setParams] = useState(null);

  const handleSearch = (currentParams, rawData) => {
    // 1. 核心防禦：如果連原始資料都沒有，直接結束
    if (!rawData || rawData.length === 0) {
      setData([]);
      return;
    }

    // 2. 篩選出真正「有填寫值」的欄位（排除 '', null, undefined）
    const activeParams = Object.entries(currentParams).filter(
      ([key, value]) => {
        return value !== "" && value !== null && value !== undefined;
      },
    );

    // 3. 判斷是否有有效的查詢條件
    if (activeParams.length === 0) {
      // 💡 狀況 A：如果大家都沒填（例如全清空），直接恢復顯示完整的原始資料
      setData(rawData);
    } else {
      // 💡 狀況 B：有至少一個欄位有值，進行動態 AND 查詢
      const result = rawData.filter((item) => {
        // every 確保所有「有值的欄位」都必須符合條件 (AND)
        return activeParams.every(([key, value]) => {
          // 【條件一】針對 sn 欄位進行「模糊比對」
          if (key === "sn") {
            const itemValue = String(item[key] || "").toLowerCase();
            const searchValue = String(value).toLowerCase();
            return itemValue.includes(searchValue); // 包含關鍵字即可
          }

          // 【條件二】其他欄位進行「精確比對」
          // 數字安全轉型比對（防止字串 '50' 與數字 50 比對失敗）
          if (item[key] !== null && !isNaN(item[key]) && !isNaN(value)) {
            return Number(item[key]) === Number(value);
          }

          // 一般字串精確比對（去除前後空格）
          return String(item[key] || "").trim() === String(value).trim();
        });
      });

      // 將篩選後的結果更新至畫面狀態
      setData(result);
    }
  };

  const handleQuery = () => {
    // console.log(params);

    // 2. 進行動態 AND 查詢
    const result = data.filter((item) => {
      return Object.entries(params).every(([key, value]) => {
        // 1. 如果 params 的值是空的，直接跳過不篩選
        if (value === "" || value === null || value === undefined) {
          return true;
        }

        // 2. 針對 sn 欄位進行「模糊比對」
        if (key === "sn") {
          const itemValue = String(item[key] || "").toLowerCase();
          const searchValue = String(value).toLowerCase();
          return itemValue.includes(searchValue); // 包含關鍵字就回傳 true
        }

        // 3. 其他欄位維持原本的「精確比對」（相容數字與文字）
        if (!isNaN(item[key]) && !isNaN(value)) {
          return Number(item[key]) === Number(value);
        }
        return String(item[key]).trim() === String(value).trim();
      });
    });

    // 檢查 params 裡面是不是「所有欄位都是空值」
    const isParamsEmpty = Object.values(params).every(
      (value) => value === "" || value === null || value === undefined,
    );

    if (isParamsEmpty) {
      // 如果大家都沒填值，直接還原成完整原始資料
      setData(originalData);
    } else {
      // 如果有至少一個欄位有值，才去用剛才篩選出來的 result
      setData(result);
    }

    // setData(result);
    // console.log(result);

    // 1. 把有值的欄位打包成一個物件
    // const searchCriteria = {};
    // if (od) searchCriteria.od = od;
    // if (sn) searchCriteria.sn = sn;
  };

  // const handleQuery = (query) => {
  //   if (!query) {
  //     setData(originalData);
  //   } else {
  //     const filtered = originalData.filter(
  //       (item) => Number(item.od) === Number(query),
  //     );
  //     setData(filtered);
  //   }
  // };

  return (
    <div>
      <Space>
        {/* <Input onChange={(e) => setQuery(e.target.value)} /> */}
        <Input
          placeholder="od"
          onChange={(e) => {
            setParams({ ...params, od: e.target.value });
          }}
        />

        <Input
          placeholder="sn"
          onChange={(e) => setParams({ ...params, sn: e.target.value })}
        />

        <Button
          icon={<SearchOutlined />}
          type="primary"
          onClick={() => handleSearch(params, data)}
        >
          查詢
        </Button>
        <Button
          icon={<PlusOutlined />}
          type="primary"
          // style={{
          //   backgroundColor: "#52c41a",
          //   color: "#fff",
          //   borderColor: "#52c41a",
          // }}
          onClick={handleAdd}
          ghost
        >
          新增
        </Button>
      </Space>
      <EditForm
        form={form}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleSave={handleSave}
        handleDelete={handleDelete}
      />
      <TableView handleEdit={handleEdit} data={data} columns={columns} />
    </div>
  );
}

export default Index;
