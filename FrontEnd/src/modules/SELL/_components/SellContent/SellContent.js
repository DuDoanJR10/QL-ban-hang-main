import React, { useEffect, useState } from 'react';
import SellFilter from './SellFilter';
import SellForm from './SellForm';
import SellList from './SellList';
import { useSelector } from 'react-redux';
import { formatPriceVND } from '../../../../helpers/funcs';

const SellContent = () => {
  const [sum, setSum] = useState(0);
  const productsBuying = useSelector((state) => state.sell.productsBuying);

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
  }, [productsBuying]);

  return (
    <div className="display-flex content">
      <div className="content__left">
        <SellList />
        <div className="content__left__sum d-flex-center justify-content-end">
          <span className="font-weight-bold ">
            Tổng tiền hàng:{' '}
            <span className="content__left__sum__price">
              {formatPriceVND(sum)}
            </span>
          </span>
        </div>
      </div>
      <div className="content__right">
        <div className="content__right__fillter">
          <SellFilter />
          <SellForm />
        </div>
      </div>
    </div>
  );
};

export default SellContent;
