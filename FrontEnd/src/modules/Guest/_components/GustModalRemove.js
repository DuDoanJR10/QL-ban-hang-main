import React from 'react';
import { Modal, Button, Space } from 'antd';
import { SaveOutlined, StopOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { setListGuest, setModalRemove } from '../_store/guestSlice';
import { removeGuest } from '../_api/index';
import { openNotificationWithIcon } from '../../../helpers/funcs'

const GuestModalRemove = () => {
  const modalRemove = useSelector(state => state.guest.modalRemove)
  const { view, codeGust, nameGust } = modalRemove
  const dispatch = useDispatch()



  const handleSubmit = () => {
    removeGuest(codeGust)
      .then(res => {
        if (res.data.success) {
          openNotificationWithIcon('success', res.data.message)
          dispatch(setListGuest(res.data.listGust))
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
      <Modal width={800} footer={null} title="Xóa khách hàng" visible={view} onCancel={handleCancel}>
        <h3>Bạn có chắc là xóa khách hàng <span style={{ color: 'red' }}>{nameGust}</span> này không ?</h3>
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

export default GuestModalRemove;