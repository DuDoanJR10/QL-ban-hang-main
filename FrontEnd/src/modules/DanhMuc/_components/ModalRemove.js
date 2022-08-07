import React from 'react';
import { Modal, Button, Space } from 'antd';
import { SaveOutlined, StopOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { setListCategory, setmodalRemove } from '../_store/categorySlice';
import { removeProduct } from '../_api';
import { openNotificationWithIcon } from '../../../helpers/funcs';

const ModalRemove = () => {
  const modalRemove = useSelector((state) => state.category.modalRemove);
  const { view, codeProduct } = modalRemove;
  const dispatch = useDispatch();

  const handleCancel = () => {
    dispatch(setmodalRemove(false));
  };
  const handleSubmit = () => {
    removeProduct(codeProduct).then((res) => {
      if (res.data.success) {
        openNotificationWithIcon('success', res.data.message);
        dispatch(setListCategory(res.data.listCategory));
        handleCancel();
      } else {
        openNotificationWithIcon('error', res.data.message);
      }
    });
  };

  return (
    <>
      <Modal
        width={800}
        footer={null}
        title="Xóa sản phẩm"
        visible={view}
        onCancel={handleCancel}
      >
        <h3>
          Bạn có chắc là xóa sản phẩm{' '}
          <span style={{ color: 'red' }}>{codeProduct}</span> này không ?
        </h3>
        <Space
          size="middle"
          className="d-flex"
          style={{ flexDirection: 'row-reverse' }}
        >
          <Button
            onClick={() => handleCancel()}
            className="font-weight-bold"
            style={{ padding: '0 32px' }}
            icon={<StopOutlined />}
          >
            Hủy
          </Button>
          <Button
            onClick={() => handleSubmit()}
            className="font-weight-bold"
            style={{ background: '#ff4d4f', border: 'none', padding: '0 32px' }}
            htmlType="submit"
            type="primary"
            icon={<SaveOutlined />}
          >
            Xóa
          </Button>
        </Space>
      </Modal>
    </>
  );
};

export default ModalRemove;
