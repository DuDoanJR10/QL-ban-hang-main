import React from 'react';
import { Modal, Button, Space } from 'antd';
import { SaveOutlined, StopOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { setModalRemove, setListStaff } from '../_store/staffSlice';
import { removeStaff } from '../_api';
import { openNotificationWithIcon } from '../../../helpers/funcs';

const StaffModalRemove = () => {
  const dispatch = useDispatch()
  const modalRemove = useSelector(state => state.staff.modalRemove)
  const { view, username, nameStaff } = modalRemove

  const handleSubmit = () => {
    removeStaff(username)
      .then(res => {
        if (res.data.success) {
          openNotificationWithIcon('success', res.data.message)
          dispatch(setListStaff(res.data.listStaff))
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
      <Modal width={800} footer={null} title="Xóa nhân viên" visible={view} onCancel={handleCancel}>
        <h3>Bạn có chắc là xóa nhân viên <span style={{ color: 'red' }}>{nameStaff}</span> này không ?</h3>
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

export default StaffModalRemove;