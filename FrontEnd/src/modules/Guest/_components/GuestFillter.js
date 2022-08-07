import React, { useRef, useState } from 'react';
import { Input, Button } from 'antd';
import {
  SearchOutlined,
  PlusOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { setModalAdd, setListGuest } from '../_store/guestSlice';
import { findGuest } from '../_api';
import { openNotificationWithIcon } from '../../../helpers/funcs';

const GuestFillter = () => {
  const dispatch = useDispatch();
  const debounceRef = useRef();
  const [loading, setLoading] = useState(false);

  const handleChangeInput = (value) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    setLoading(true);
    debounceRef.current = setTimeout(() => {
      findGuest(value)
        .then((res) => {
          if (res.data.success) {
            dispatch(setListGuest(res.data.arrayFind));
            setLoading(false);
          } else {
            openNotificationWithIcon('error', res.data.message);
          }
        })
        .catch(() => {
          openNotificationWithIcon(
            'error',
            'Có lỗi xảy ra, xin vui lòng thử lại!'
          );
        });
    }, 600);
  };

  const handleClickAdd = () => {
    dispatch(setModalAdd(true));
  };

  return (
    <div
      className="d-flex align-items-center justify-content-between"
      style={{ width: '50%' }}
    >
      <Input
        onChange={(e) => handleChangeInput(e.target.value)}
        addonAfter={loading ? <LoadingOutlined /> : <SearchOutlined />}
        placeholder="Theo mã, tên, điện thoại"
        style={{ width: '70%' }}
        allowClear
      />
      <Button
        onClick={() => handleClickAdd()}
        className="font-weight-bold "
        type="primary"
        icon={<PlusOutlined />}
        style={{ borderRadius: '8px' }}
      >
        Khách Hàng
      </Button>
    </div>
  );
};

export default GuestFillter;
