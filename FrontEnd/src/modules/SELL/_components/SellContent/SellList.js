import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { InputNumber } from 'antd';
import { formatPriceVND } from '../../../../helpers/funcs';
import { useSelector, useDispatch } from 'react-redux';
import { setProductsBuying } from '../../_store/sellSlice';


const SellList = () => {
  const dispatch = useDispatch()
  const productsBuying = useSelector(state => state.sell.productsBuying)

  const handleChangeAmout = (e, value) => {
    let newArray = new Array

    productsBuying.map((o) => {
      if (o.codeProduct === value.codeProduct) {
        newArray.push({ ...o, amout: e })
        dispatch(setProductsBuying([...newArray]))
      } else {
        newArray.push(o)
        dispatch(setProductsBuying([...newArray]))
      }
    })
  }

  const handleChangePriceSell = (e, value) => {
    let newArray = new Array

    productsBuying.map((o) => {
      if (o.codeProduct === value.codeProduct) {
        newArray.push({ ...o, priceSell: e })
        dispatch(setProductsBuying([...newArray]))
      } else {
        newArray.push(o)
        dispatch(setProductsBuying([...newArray]))
      }
    })
  }

  const handleClickRemove = (codeProduct) => {
    let myArray = productsBuying.filter(function( obj ) {
      return obj.codeProduct !== codeProduct;
    });

    dispatch(setProductsBuying([...myArray]))
  }

  return (
    <div className='productBuyding'>
      {productsBuying.map((value, index) => (
        <div key={index} className='content__left__list'>
          <div className='item d-flex-center'>
            <div className='item__title d-flex align-items-center'>
              <a>{value.codeProduct}</a>
              <h3>{value.productName}</h3>
            </div>
            <div className='item__price d-flex align-items-center'>
              <InputNumber style={{ width: '100px', border: 'none' }} value={value.amout} min={1} onChange={e => handleChangeAmout(e, value)} />
              <InputNumber style={{ width: '100px', border: 'none' }} value={value.priceSell} onChange={e => handleChangePriceSell(e, value)} formatter={value => `${value} ₫`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} min={1} />
              <h4>{formatPriceVND(value.amout * value.priceSell)}</h4>
              <button onClick={() => handleClickRemove(value.codeProduct)}><DeleteOutlined style={{ fontSize: '20px', fontWeight: 'bold' }} /></button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default SellList;
