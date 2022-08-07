import React, { useEffect, useRef, useState } from 'react';
import { Drawer, Button, Input, Space, Form, Divider } from 'antd';
import { useSelector } from 'react-redux';
import {
  formatPrice,
  openNotificationWithIcon,
} from '../../../../helpers/funcs';
import { createInvoice, findCustomer } from '../../_api';

const SellDrawerOrder = () => {
  const [visible, setVisible] = useState(false);
  const [sum, setSum] = useState(0);
  const [newCustomer, setNewCustomer] = useState('');
  const customer = useSelector((state) => state.sell.customer);
  const productsBuying = useSelector((state) => state.sell.productsBuying);
  const [priceRefunds, setPriceRefunds] = useState();

  // const [codeProduct, setCodeProduct] = useState();
  // const [nameProduct, setNameProduct] = useState();
  // const [countProduct, setCountProduct] = useState();
  // const [priceSell, setPriceSell] = useState();
  // const [priceCapital, setPriceCapital] = useState();

  let { nameGust, addressGust, phoneGust } = newCustomer;
  //get productByIng
  // const checkProductBuyIng = () => {
  //   productsBuying.map((item) => {
  //     setCodeProduct(item.codeProduct);
  //     setNameProduct(item.productName);
  //     setCountProduct(item.amout);
  //     setPriceSell(item.priceSell);
  //     setPriceCapital(item.priceCapital);
  //   });
  // };
  // get customer info
  const debounceRef = useRef();
  const handleChangeInput = (value) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      if (customer !== '') {
        findCustomer(value)
          .then((res) => {
            if (res.data.success) {
              setNewCustomer(res.data.guest);
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
      }
    }, 600);
  };
  useEffect(() => {
    handleChangeInput(customer);
  }, [customer]);

  // get sum
  useEffect(() => {
    let initSum = 0;
    if (productsBuying.length != 0) {
      productsBuying.map((value) => {
        initSum = initSum + value.amout * value.priceSell;
        setSum(initSum);
      });
    } else {
      setSum(initSum);
    }
    // checkProductBuyIng();
  }, [productsBuying]);

  // call api incoice

  const onSubmit = () => {
    if (!priceRefunds) {
      return alert('Nhập số tiền khách hàng trả!');
    } else {
      createInvoice({
        nameGuest: nameGust,
        addressGuest: addressGust,
        phoneGuest: phoneGust,
        productsBuying: productsBuying,
        totalMoney: sum,
      }).then((res) => {
        if (res.data.success) {
          openNotificationWithIcon('success', res.data.message);
          onClose();
        } else {
          openNotificationWithIcon('error', res.data.message);
        }
      });
    }
  };

  // event
  const showDrawer = () => {
    if (productsBuying.length == 0 || customer == '') {
      return alert('Vui lòng chọn sản phẩm hoặc khách hàng');
    } else {
      return setVisible(true);
    }
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <Button
        className="btn-order"
        style={{ borderRadius: '8px', marginLeft: '24px' }}
        type="primary"
        onClick={showDrawer}
      >
        Đặt hàng
      </Button>
      <Drawer
        title="Hóa đơn thanh toán"
        width={500}
        onClose={onClose}
        visible={visible}
        bodyStyle={{
          paddingBottom: 80,
        }}
      >
        <Form layout="vertical" hideRequiredMark>
          <div className="d-flex-center1 justify-content-between">
            <h2 className="">Khách hàng: </h2>
            <h2>{nameGust}</h2>
          </div>

          <div className="d-flex-center1 justify-content-between">
            <span className="">Tổng tiền hàng: </span>
            <span className="font-size-18">{formatPrice(sum)} VND</span>
          </div>
          <div className="d-flex-center1 justify-content-between">
            <span className=" ">Khách cần trả: </span>
            <span className="font-size-18 color-sum-price">
              {formatPrice(sum)} VND
            </span>
          </div>
          <div className="d-flex-center1 inp-order justify-content-between">
            <span className=" ">Khách thanh toán: </span>
            <Input
              className="text-right  font-24 primary-color"
              type="number"
              onChange={(e) => setPriceRefunds(e.target.value)}
              rules={[{ required: true, message: 'Tên sản phẩm bắt buộc' }]}
            />
          </div>
          <Divider />
          <div className="d-flex-center1 justify-content-between">
            <span className=" ">Tiền thừa trả lại khách: </span>
            <span className="font-24">
              {!priceRefunds ? 0 : formatPrice(priceRefunds - sum)} VND
            </span>
          </div>
          <Space>
            <Button
              className="font-24 btn-order"
              type="primary"
              onClick={onSubmit}
            >
              Thanh toán
            </Button>
          </Space>
        </Form>
      </Drawer>
    </>
  );
};

export default SellDrawerOrder;
