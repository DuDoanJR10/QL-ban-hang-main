import { Button, Space, Table } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatPrice } from '../../../helpers/funcs';
import {
  setmodalUpdate,
  setmodalRemove,
  setListCategory,
} from '../_store/categorySlice';
import { getListProduct } from '../_api';
import { openNotificationWithIcon } from '../../../helpers/funcs';

const PriceSettingTable = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    getListProduct().then((res) => {
      if (res.data.success) {
        dispatch(setListCategory(res.data.GoodList));
      } else {
        openNotificationWithIcon('error', res.data.message);
      }
    });
  }, []);

  const handleClickUpdate = (
    codeProduct,
    productName,
    priceCapital,
    priceSell,
    inventory,
    filePath
  ) => {
    dispatch(
      setmodalUpdate({
        view: true,
        codeProduct,
        productName,
        priceCapital,
        priceSell,
        inventory,
        filePath,
      })
    );
  };

  const handelClickRemove = (codeProduct) => {
    dispatch(
      setmodalRemove({
        view: true,
        codeProduct,
      })
    );
  };

  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      width: '4%',
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: 'Mã hàng',
      width: '10%',
      align: 'center',
      dataIndex: 'codeProduct',
    },
    {
      title: 'Tên hàng',
      align: 'center',
      width: '20%',
      dataIndex: 'productName',
    },
    {
      title: 'Giá nhập',
      align: 'center',
      width: '16%',
      dataIndex: 'priceCapital',
      render: (text) => <span>{text ? formatPrice(text) : text}</span>,
    },
    {
      title: 'Giá bán',
      width: '16%',
      align: 'center',
      dataIndex: 'priceSell',
      render: (text) => <span>{text ? formatPrice(text) : text}</span>,
    },

    {
      title: 'Hành động',
      align: 'center',
      width: '18%',
      dataIndex: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button
            type="primary"
            shape="round"
            size="small"
            style={{ background: '#4bac4d', border: 'none' }}
            onClick={() =>
              handleClickUpdate(
                record.codeProduct,
                record.productName,
                record.priceCapital,
                record.priceSell,
                record.inventory,
                record.filePath
              )
            }
          >
            Cập nhật giá
          </Button>
          <Button
            type="primary"
            shape="round"
            size="small"
            danger
            onClick={() => handelClickRemove(record.codeProduct)}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  const data = useSelector((state) => state.category.listCategory);
  const loadingTable = useSelector((state) => state.category.loadingTable);

  return <Table loading={loadingTable} columns={columns} dataSource={data} />;
};

export default PriceSettingTable;
