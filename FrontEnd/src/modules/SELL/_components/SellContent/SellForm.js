import React, { useEffect, useState } from 'react';
import { Card, Avatar } from 'antd';
import { getProduct } from '../../_api';
import {
  openNotificationWithIcon,
  formatPriceVND,
} from '../../../../helpers/funcs';
import { useSelector, useDispatch } from 'react-redux';
import { setProductsBuying } from '../../_store/sellSlice';
import SellDrawerOrder from './sellDrawerOrder';

const SellForm = () => {
  const dispatch = useDispatch();
  const productsBuying = useSelector((state) => state.sell.productsBuying);

  const { Meta } = Card;
  const [data, setData] = useState([]);

  useEffect(() => {
    getProduct()
      .then((res) => {
        if (res.data.success) {
          setData(res.data.GoodList);
        } else {
          openNotificationWithIcon('error', res.data.message);
        }
      })
      .catch(() =>
        openNotificationWithIcon(
          'error',
          'Có lỗi xảy ra, xin vui lòng thử lại !'
        )
      );
  }, []);

  const handleClickProduct = (value) => {
    let newArray = new Array();

    let obj = productsBuying.find((o) => o.codeProduct === value.codeProduct);

    if (obj !== undefined) {
      productsBuying.map((o) => {
        if (o.codeProduct === value.codeProduct && o.inventory > o.amout) {
          newArray.push({ ...o, amout: o.amout + 1 });
          dispatch(setProductsBuying([...newArray]));
        } else {
          newArray.push(o);
          dispatch(setProductsBuying([...newArray]));
        }
      });
    } else {
      dispatch(setProductsBuying([...productsBuying, { ...value, amout: 1 }]));
    }
  };

  return (
    <>
      <div className="d-flex flex-wrap" style={{ marginTop: '30px' }}>
        {data.map((value, index) => (
          <Card
            key={index}
            style={{
              width: '31%',
              margin: '12px 12px 0 0',
              cursor: 'pointer',
            }}
            onClick={() => handleClickProduct(value)}
          >
            <Meta
              avatar={<Avatar src={value.filePath} />}
              title={value.productName}
              description={formatPriceVND(value.priceSell)}
            />
          </Card>
        ))}
      </div>
      {/* <Button
        type="primary"
        className=""
        size={'large'}
        onClick={() => {
          setActiveModal(visibleMdal);
        }}
      >
        Thanh toán
      </Button> */}
      <SellDrawerOrder />
    </>
  );
};

export default SellForm;
