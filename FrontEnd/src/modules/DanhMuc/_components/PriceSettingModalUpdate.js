import { SaveOutlined, StopOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Modal, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setmodalUpdate, setListCategory } from '../_store/categorySlice';
import { openNotificationWithIcon } from '../../../helpers/funcs';
import { updatePriceSell } from '../_api';

const PriceSettingModalUpdate = () => {
  const modalUpdate = useSelector((state) => state.category.modalUpdate);
  const [codeProductState, setCodeProductState] = useState();

  const [priceSellState, setPriceSellState] = useState(modalUpdate.priceSell);
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const handelcancel = () => {
    dispatch(setmodalUpdate(false));
  };

  useEffect(() => {
    const { codeProduct, productName, priceSell } = modalUpdate;
    setCodeProductState(codeProduct);
    setPriceSellState(priceSell);

    form.setFieldsValue({
      codeProduct: codeProduct,
      productName: productName,
      priceSell: priceSell,
    });
  }, [modalUpdate]);

  // dữ liệu form
  const onFinish = (values) => {
    console.log(values);
  };

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const handleSubmitUpdate = () => {
    updatePriceSell({
      codeProduct: codeProductState,
      priceSell: priceSellState,
    })
      .then((res) => {
        if (res.data.success) {
          dispatch(setListCategory(res.data.listCategory));
          openNotificationWithIcon('success', res.data.message);
          handelcancel();
        } else {
          openNotificationWithIcon('error', res.data.message);
        }
      })
      .catch(() =>
        openNotificationWithIcon(
          'error',
          'Có lỗi xảy ra, xin vui lòng thử lại!'
        )
      );
  };

  return (
    <>
      <Modal
        width={600}
        visible={modalUpdate.view}
        footer={null}
        title="Cập nhật giá sản phẩm"
        onCancel={handelcancel}
      >
        <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
          <Col span={24}>
            <Form.Item
              name="productName"
              label="Tên sản phẩm"
              rules={[{ required: true, message: 'Tên sản phẩm bắt buộc' }]}
            >
              <Input disabled={1 === 1} />
            </Form.Item>

            <Form.Item
              name="priceSell"
              label="Giá bán"
              rules={[{ required: true, message: 'Giá bán bắt buộc' }]}
            >
              <Input onChange={(e) => setPriceSellState(e.target.value)} />
            </Form.Item>
          </Col>

          <Form.Item {...tailLayout}>
            <Space
              size="middle"
              className="d-flex"
              style={{ flexDirection: 'row-reverse' }}
            >
              <Button
                onClick={() => handelcancel()}
                className="font-weight-bold"
                style={{ padding: '0 32px' }}
                icon={<StopOutlined />}
              >
                Hủy
              </Button>

              <Button
                className="font-weight-bold"
                onClick={() => handleSubmitUpdate()}
                style={{
                  background: '#4bac4d',
                  border: 'none',
                  padding: '0 32px',
                }}
                htmlType="submit"
                type="primary"
                icon={<SaveOutlined />}
              >
                Cập nhật
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default PriceSettingModalUpdate;
