import React, { useEffect, useState } from 'react';
import { Table, Space, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { getListGuest } from '../_api/index';
import {
  setListGuest,
  setModalUpdate,
  setFillUpdate,
  setModalRemove,
} from '../_store/guestSlice';
import { openNotificationWithIcon } from '../../../helpers/funcs';

const GuestTable = () => {
  const listGuest = useSelector((state) => state.guest.listGuest);
  const modalUpdate = useSelector((state) => state.guest.modalUpdate);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  const handleClickUpdate = (codeGust, nameGust, phoneGust, addressGust) => {
    dispatch(
      setFillUpdate({
        ...modalUpdate,
        codeGust,
        nameGust,
        phoneGust,
        addressGust,
      })
    );
    dispatch(setModalUpdate(true));
  };

  const handleClickRemove = (codeGust, nameGust) => {
    dispatch(setModalRemove({ view: true, codeGust, nameGust }));
  };

  useEffect(() => {
    getListGuest()
      .then((res) => {
        if (res.data.success) {
          dispatch(setListGuest(res.data.GustList));
          setLoading(false);
        } else {
          openNotificationWithIcon('error', res.data.message);
          setLoading(false);
        }
      })
      .catch((err) => {
        openNotificationWithIcon('error', err);
        setLoading(false);
      });
  }, []);

  const columns = [
    {
      title: 'STT',
      dataIndex: 'STT',
      key: 'STT',
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: 'Mã khách hàng',
      dataIndex: 'codeGust',
      key: 'codeGust',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Tên khách hàng',
      dataIndex: 'nameGust',
      key: 'nameGust',
    },
    {
      title: 'Số Điện Thoại',
      dataIndex: 'phoneGust',
      key: 'phoneGust',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'addressGust',
      key: 'addressGust',
    },
    {
      title: 'Tổng bán',
      dataIndex: 'total',
      key: 'total',
    },
    {
      title: 'Hoạt động',
      key: 'action',
      render: (text, record) => {
        return (
          <Space size="middle">
            <Button
              onClick={() =>
                handleClickUpdate(
                  record.codeGust,
                  record.nameGust,
                  record.phoneGust,
                  record.addressGust
                )
              }
              type="primary"
              shape="round"
              size="small"
              style={{ background: '#4bac4d', border: 'none' }}
            >
              Cập nhật
            </Button>
            <Button
              onClick={() => handleClickRemove(record.codeGust, record.nameGust)}
              type="primary"
              shape="round"
              size="small"
              danger
            >
              Xóa
            </Button>
          </Space>
        )},
    },
  ];

  return (
    <div style={{ marginTop: '30px' }}>
      <Table columns={columns} dataSource={listGuest} loading={loading} />
    </div>
  );
};

export default GuestTable;
