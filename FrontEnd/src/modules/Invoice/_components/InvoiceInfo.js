import React from 'react';
import { Modal, Table } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { setModalInfo } from '../_store/invoiceSlice';
import { formatNumber } from '../../../helpers/funcs';


const InvoiceModalInfo = () => {
  const modalInfo = useSelector(state => state.invoice.modalInfo)
  const dispatch = useDispatch()

  const { view, codeInvoice, createAt, nameGuest, addressGuest, phoneGuest, nameSeller, paymentType, totalMoney, productsBuying } = modalInfo

  const handleCancel = () => {
    dispatch(setModalInfo({ ...modalInfo, view: false }))
  }

  const handleTotal = (soluong, giatien) => {
    return Number(soluong) * Number(giatien)
  }

  const columns = [
    {
      title: 'STT',
      dataIndex: 'STT',
      render: (text, record, index) => <span>{index + 1}</span>
    },
    {
      title: 'Mã sản phẩm',
      dataIndex: 'codeProduct',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'productName',
    },
    {
      title: 'Số lượng',
      dataIndex: 'amout',
    },
    {
      title: 'Giá bán',
      dataIndex: 'priceSell',
      render: text => <span>{formatNumber(text)}</span>
    },
    {
      title: 'Thành tiền',
      dataIndex: 'total',
      render: (text, record) => (
        <span>{ formatNumber(handleTotal(record.amout, record.priceSell)) }</span>
      )
    },
  ];

  return (
    <>
      <Modal width={800} footer={null} title="Thông tin hóa đơn" visible={view} onCancel={handleCancel}>
        <div className='modal__info d-flex full-width'>
          <div className='modal__info__left'>
            <div className='item'>
              <p>Mã hóa đơn</p>
              <h4 style={{ color: 'blue' }} >{codeInvoice}</h4>
            </div>
            <div className='item'>
              <p>Thời gian</p>
              <h4>{createAt}</h4>
            </div>
            <div className='item'>
              <p>Khách hàng</p>
              <h4>{nameGuest}</h4>
            </div>
            <div className='item'>
              <p>Địa chỉ khách hàng</p>
              <h4>{addressGuest}</h4>
            </div>
            <div className='item'>
              <p>Số điện thoại khách hàng</p>
              <h4>{phoneGuest}</h4>
            </div>
          </div>
          <div className='modal__info__right'>
            <div className='item'>
              <p>Trạng thái</p>
              <h4 style={{ color: 'green' }} >Hoành thành</h4>
            </div>
            <div className='item'>
              <p>Người bán</p>
              <h4>{nameSeller}</h4>
            </div>
            <div className='item'>
              <p>Phương thức</p>
              <h4>{paymentType}</h4>
            </div>
            <div className='item'>
              <p>Tổng tiền hàng</p>
              <h4 style={{ color: 'red' }} >{formatNumber(totalMoney)}</h4>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '30px' }}>
          <Table columns={columns} dataSource={productsBuying} pagination={{ pageSize: 3}} />
        </div>
      </Modal>
    </>
  );
};

export default InvoiceModalInfo;