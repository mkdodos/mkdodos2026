import {
  Modal,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Button,
  Space,
  Divider,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
const BoxModal = ({ open, onCancel, onOk, form, editingId, onDelete }) => {
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      onOk={onOk}
      footer={
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            {editingId && (
              <Popconfirm
                title="確定要刪除嗎？"
                onConfirm={() => onDelete(editingId)}
                okButtonProps={{ danger: true }}
              >
                <Button danger icon={<DeleteOutlined />}>
                  刪除
                </Button>
              </Popconfirm>
            )}
          </div>

          <Button key="submit" type="primary" onClick={onOk}>
            Ok
          </Button>
        </div>
      }
    >
      <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
        <Form.Item
          name="name"
          label="箱名"
          rules={[{ required: true, message: "請輸入箱名" }]}
        >
          <Input placeholder="例如：心情" />
        </Form.Item>
        <Form.Item name="location" label="地點">
          <Input placeholder="例如：情緒" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default BoxModal;
