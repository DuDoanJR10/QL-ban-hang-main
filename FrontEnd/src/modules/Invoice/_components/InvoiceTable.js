import React, { useEffect, useState } from 'react';
import { Table, Space, Button } from 'antd';
import { getListInvoice } from '../_api';
import { useDispatch, useSelector } from 'react-redux';
import {
  setListInvoice,
  setModalInfo,
  setModalRemove,
} from '../_store/invoiceSlice';
import { openNotificationWithIcon, formatPrice } from '../../../helpers/funcs';

const InvoiceTable = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const listInvoice = useSelector((state) => state.invoice.listInvoice);

  useEffect(() => {
    getListInvoice()
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          dispatch(setListInvoice(res.data.InoviceList));
          setLoading(false);
        } else {
          openNotificationWithIcon('error', res.data.message);
          setLoading(false);
        }
      })
      .catch(() => {
        openNotificationWithIcon(
          'error',
          'Có lỗi xảy ra, xin vui lòng thử lại!'
        );
        setLoading(false);
      });
  }, []);

  const handleClickInfo = (record) => {
    dispatch(setModalInfo({ view: true, ...record }));
  };

  const handleClickRemove = (codeInvoice) => {
    dispatch(setModalRemove({ view: true, codeInvoice }));
  };

  const columns = [
    {
      title: 'STT',
      dataIndex: 'STT',
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: 'Mã hóa đơn',
      dataIndex: 'codeInvoice',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Thời gian',
      dataIndex: 'createAt',
    },
    {
      title: 'Khách hàng',
      dataIndex: 'nameGuest',
    },
    {
      title: 'Người bán',
      dataIndex: 'nameSeller',
    },
    {
      title: 'Phương thức',
      dataIndex: 'paymentType',
    },
    {
      title: 'Tổng tiền hàng',
      dataIndex: 'totalMoney',
      render: (text) => (
        <span style={{ color: 'red' }}>{text ? formatPrice(text) : text}</span>
      ),
    },
    {
      title: 'Hoạt động',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button
            onClick={() => {
              console.log(record);
              return handleClickInfo(record)
            }}
            type="primary"
            shape="round"
            size="small"
          >
            Thông tin
          </Button>
          <Button
            onClick={() => handleClickRemove(record.codeInvoice)}
            type="primary"
            shape="round"
            size="small"
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
      <Table columns={columns} dataSource={listInvoice} loading={loading} />
    </div>
  );
};

export default InvoiceTable;
