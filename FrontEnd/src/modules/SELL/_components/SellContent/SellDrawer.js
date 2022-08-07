import React, { useState } from 'react';
import { Drawer, Button, Input, Space, Form, Col, Row } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { addGuest } from '../../_api';
import { openNotificationWithIcon } from '../../../../helpers/funcs';
import { addListGust } from '../../_store/sellSlice';
import { SaveOutlined, StopOutlined } from '@ant-design/icons';

const SellDrawer = () => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [nameGust, setNameGust] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = () => {
    if (nameGust != '') {
      addGuest(nameGust, phone, address)
        .then((res) => {
          if (res.data.success) {
            dispatch(addListGust(res.data.newGust));
            onReset();
            onClose();
            openNotificationWithIcon('success', res.data.message);
          } else {
            openNotificationWithIcon('error', res.data.message);
          }
        })
        .catch((err) => {
          openNotificationWithIcon('error', err);
        });
    }
  };

  const onReset = () => {
    form.resetFields();
    setNameGust('');
    setPhone('');
    setAddress('');
  };

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <Button
        style={{ borderRadius: '8px', marginLeft: '24px' }}
        type="primary"
        onClick={showDrawer}
        icon={<PlusOutlined />}
      >
        Thêm mới
      </Button>
      <Drawer
        title="Thêm khách hàng mới"
        width={610}
        onClose={onClose}
        visible={visible}
        bodyStyle={{
          paddingBottom: 80,
        }}
      >
        <Form
          name="basic"
          initialValues={{ remember: true }}
          autoComplete="off"
          form={form}
          layout="vertical"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                className="font-weight-bold"
                label="Tên khách hàng"
                name="nameGust"
                rules={[
                  { required: true, message: 'Vui lòng nhập tên khách hàng!' },
                ]}
              >
                <Input onChange={(e) => setNameGust(e.target.value)} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                className="font-weight-bold"
                label="Số điện thoại"
                name="phone"
                rules={[
                  {
                    required: true,
                    pattern: new RegExp(
                      /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/
                    ),
                    message: 'Số điện thoại chưa đúng định dạng',
                  },
                ]}
              >
                <Input
                  type="number"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                className="font-weight-bold"
                label="Địa chỉ"
                name="address"
                rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
              >
                <Input onChange={(e) => setAddress(e.target.value)} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                className="font-weight-bold"
                name="description"
                label="Ghi chú"
              >
                <Input.TextArea rows={4} placeholder="Ghi chú" />
              </Form.Item>
            </Col>
          </Row>
          <Space
            size="middle"
            className="d-flex"
            style={{ flexDirection: 'row-reverse' }}
          >
            <Button
              onClick={() => onClose()}
              className="font-weight-bold"
              style={{ padding: '0 32px' }}
              icon={<StopOutlined />}
            >
              Hủy
            </Button>
            <Button
              onClick={() => handleSubmit()}
              className="font-weight-bold"
              style={{
                background: '#4bac4d',
                border: 'none',
                padding: '0 32px',
              }}
              htmlType="submit"
              type="primary"
              icon={<SaveOutlined />}
            >
              Tạo
            </Button>
          </Space>
        </Form>
      </Drawer>
    </>
  );
};

export default SellDrawer;
