/* eslint-disable react/jsx-no-undef */
import React, { useRef } from 'react';
import { Button, Input, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { setmodalAdd, setLoadingTable, setListCategory } from '../_store/categorySlice';
import { find } from '../_api'
import { openNotificationWithIcon } from '../../../helpers/funcs';
const { Search } = Input;

const onSearch = (value) => console.log(value);
const Filter = () => {
  const debounceRef = useRef()
  const dispatch = useDispatch();
  const handleClickAdd = () => {
    dispatch(
      setmodalAdd({
        view: true,
      })
    );
  };

  const handleOnChange = (value) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    dispatch(setLoadingTable(true))
    debounceRef.current = setTimeout(() => {
      find(value)
        .then(res => {
          if (res.data.success) {
            dispatch(setListCategory(res.data.arrayFind))
            dispatch(setLoadingTable(false))
          } else {
            openNotificationWithIcon('error', res.data.message)
          }
        })
        .catch(() => {
          openNotificationWithIcon('error', 'Có lỗi xảy ra, xin vui lòng thử lại!')
        })
    }, 600);
  }

  return (
    <div>
      <Space
        direction="
    Horizontal"
      >
        <Search
          style={{ width: 300 }}
          placeholder="Tìm kiếm..."
          onSearch={onSearch}
          enterButton
          onChange={e => handleOnChange(e.target.value)}
        />

        <Button
          onClick={() => handleClickAdd()}
          className="font-weight-bold "
          type="primary"
          icon={<PlusOutlined />}
          style={{ borderRadius: '8px' }}
        >
          Thêm mới
        </Button>
      </Space>
    </div>
  );
};

export default Filter;
