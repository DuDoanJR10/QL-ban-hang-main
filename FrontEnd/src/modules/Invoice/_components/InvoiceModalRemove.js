import React from 'react';
import { Modal, Button, Space } from 'antd';
import { SaveOutlined, StopOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { setModalRemove, setListInvoice } from '../_store/invoiceSlice';
import { removeInvoice } from '../_api';
import { openNotificationWithIcon } from '../../../helpers/funcs';

const InvoiceModalRemove = () => {
  const modalRemove = useSelector(state => state.invoice.modalRemove)
  const dispatch = useDispatch()
  const { view, codeInvoice } = modalRemove
  const handleSubmit = () => {
    removeInvoice(codeInvoice)
      .then(res => {
        if (res.data.success) {
          dispatch(setListInvoice(res.data.InoviceList))
          handleCancel()
        } else {
          openNotificationWithIcon('error', res.data.message)
        }
      })
      .catch(() => openNotificationWithIcon('error', 'Có lỗi xảy ra, xin vui lòng thử lại!'))
  };

  const handleCancel = () => {
    dispatch(setModalRemove({ ...modalRemove, view: false }))
  };

  return (
    <>
      <Modal width={800} footer={null} title="Xóa hóa đơn" visible={view} onCancel={handleCancel}>
        <h3>Bạn có chắc là xóa hóa đơn <span style={{ color: 'red' }}>{codeInvoice}</span> này không ?</h3>
        <Space size="middle" className='d-flex' style={{ flexDirection: 'row-reverse' }}>
          <Button onClick={() => handleCancel()} className='font-weight-bold' style={{ padding: '0 32px' }} icon={<StopOutlined />} >Hủy</Button>
          <Button onClick={() => handleSubmit()} className='font-weight-bold' style={{ background: '#ff4d4f', border: 'none', padding: '0 32px' }} htmlType="submit" type="primary" icon={<SaveOutlined />}>
            Xóa
          </Button>
        </Space>
      </Modal>
    </>
  );
};

export default InvoiceModalRemove;