import React, { useEffect, useState } from 'react';
import { Table, Space, Button } from 'antd';
import { getListStaff } from '../_api';
import { useDispatch, useSelector } from 'react-redux';
import { setListStaff, setModalUpdate, setModalRemove } from '../_store/staffSlice';
import { openNotificationWithIcon } from '../../../helpers/funcs';


const StaffTable = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  const listStaff = useSelector(state => state.staff.listStaff)
  // const modalUpdate = useSelector(state => state.staff.modalUpdate)
  
  useEffect(() => {
    getListStaff()
      .then(res => {
        if (res.data.success) {
          dispatch(setListStaff(res.data.userList))
          setLoading(false)
        } else {
          openNotificationWithIcon('error', res.data.message)
          setLoading(false)
        }
      })
      .catch(() => {
        openNotificationWithIcon('error', 'Có lỗi xảy ra, xin vui lòng thử lại!')
        setLoading(false)
      })
  }, [])

  const handleClickUpdate = (codeStaff, nameStaff, phoneStaff, username) => {
    dispatch(setModalUpdate({ view: true, codeStaff, nameStaff, phoneStaff, username }))
  }

  const handleClickRemove = (codeStaff, nameStaff, username) => {
    dispatch(setModalRemove({ view: true, codeStaff, nameStaff, username }))
  }

  const columns = [
    {
      title: 'STT',
      dataIndex: 'STT',
      render: (text, record, index) => <span>{index + 1}</span>
    },
    {
      title: 'Mã nhân viên',
      dataIndex: 'codeStaff',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Tên nhân viên',
      dataIndex: 'nameStaff',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phoneStaff',
    },
    {
      title: 'Tài khoản',
      dataIndex: 'username',
    },
    {
      title: 'Mật khẩu',
      dataIndex: 'password',
      render: text => <input style={{ border: 'none' }} type='password' value={text} disabled />
    },
    {
      title: 'Hoạt động',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button 
            onClick={() => handleClickUpdate(record.codeStaff, record.nameStaff, record.phoneStaff, record.username)} 
            type="primary" 
            shape="round" 
            size='small' 
            style={{ background: '#4bac4d', border: 'none' }}
          >
            Cập nhật
          </Button>
          <Button 
            onClick={() => handleClickRemove(record.codeStaff, record.nameStaff, record.username)} 
            type="primary" 
            shape="round" 
            size='small' 
            danger
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ marginTop: '30px' }}>
      <Table columns={columns} dataSource={listStaff} loading={loading} />
    </div>
  );
};

export default StaffTable;
