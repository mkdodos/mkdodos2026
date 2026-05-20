


// 呼叫 form.resetFields() 後，所有的欄位會回到 initialValues 設定的狀態
    form.resetFields();

```javascript
<Form 
  initialValues={{ is_enabled: true }} // 在這裡統一設定預設值
>
  <Form.Item 
    name="is_enabled" 
    label="狀態" 
    valuePropName="checked" // 必須加上這行
  >
    <Switch />
  </Form.Item>
</Form>
```

當你將 Button 的 htmlType 設置為 "submit"，並且該按鈕位於 <Form> 標籤內時，點擊按鈕會觸發 Form 的 onFinish 事件，Ant Design 會自動收集所有包裹在 <Form.Item name="xxx"> 中的欄位值，並封裝成一個對象（Object）傳遞給 onFinish。

```javascript
<Form
  onFinish={(values) => {
    // 這裡的 values 就是自動取得的對象
    // 格式如：{ username: "Gemini", age: 25 }
    console.log('取得的值：', values);
  }}
>
  <Form.Item label="用戶名" name="username">
    <Input />
  </Form.Item>

  <Form.Item label="年齡" name="age">
    <InputNumber />
  </Form.Item>

  <Form.Item>
    <Button type="primary" htmlType="submit">
      提交
    </Button>
  </Form.Item>
</Form>

```

## 表單下拉選單 





使用 `<Select>` 
* options : 選單項目(陣列)
* lable : 選單文字
* value : 選單值
```
<Select
    options={[
        {
            label: "選項一",
            value: "選項值1",
        },
        {
            label: "選項二",
            value: "選項值2",
        },
    ]}
></Select>
```

