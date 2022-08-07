import React, { useRef, useState } from 'react';
import { Input, Button } from 'antd';
import { SearchOutlined, PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { setModalAdd, setListStaff } from '../_store/staffSlice';
import { findStaff } from '../_api';
import { openNotificationWithIcon } from '../../../helpers/funcs';

const StaffFillter = () => {
  const debounceRef = useRef()
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const handleChangeInput = (value) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    setLoading(true)
    debounceRef.current = setTimeout(() => {
      findStaff(value)
        .then(res => {
          if (res.data.success) {
            dispatch(setListStaff(res.data.arrayFind))
            setLoading(false)
          } else {
            openNotificationWithIcon('error', res.data.message)
          }
        })
        .catch(() => {
          openNotificationWithIcon('error', 'Có lỗi xảy ra, xin vui lòng thử lại!')
        })
    }, 600);
  }

  const handleClicKAdd = () => {
    dispatch(setModalAdd(true))
  }

  return (
    <div className='d-flex align-items-center justify-content-between' style={{ width: '50%' }}>
      <Input onChange={e => handleChangeInput(e.target.value)} addonAfter={loading ? <LoadingOutlined /> : <SearchOutlined />} placeholder="Theo mã, tài khoản, tên" style={{ width: '70%' }} allowClear />
      <Button onClick={() => handleClicKAdd()} className='font-weight-bold ' type="primary" icon={<PlusOutlined />} style={{ borderRadius: '8px' }} >Nhân viên</Button>
    </div>
  );
};

export default StaffFillter;
