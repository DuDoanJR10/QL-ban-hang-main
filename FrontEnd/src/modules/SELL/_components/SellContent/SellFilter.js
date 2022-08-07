import React, { useState } from 'react';
import { Select } from 'antd';
import { findGuest } from '../../_api';
import SellDrawer from './SellDrawer';
import { setCustomer } from '../../_store/sellSlice';
import { useDispatch } from 'react-redux';

const SellFilter = () => {
  const [data, setData] = useState([]);
  const [value, setValue] = useState();
  const dispatch = useDispatch();
  let timeout;
  let currentValue;
  const fetch = (value, callback) => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }

    currentValue = value;

    const fake = () => {
      findGuest(value).then((res) => {
        if (currentValue === value) {
          const { arrayFind } = res.data;
          const data = arrayFind.map((item) => ({
            value: item.codeGust,
            text: `${item.codeGust} - ${item.nameGust} - ${item.phoneGust}`,
          }));
          callback(data);
        }
      });
    };

    timeout = setTimeout(fake, 300);
  };

  const handleSearch = (newValue) => {
    if (newValue) {
      fetch(newValue, setData);
    } else {
      setData([]);
    }
  };

  const handleChange = (newValue) => {
    setValue(newValue);
    dispatch(setCustomer(newValue));
  };

  const { Option } = Select;
  const options = data.map((d) => <Option key={d.value}>{d.text}</Option>);

  return (
    <div className="d-flex-center ">
      <Select
        showSearch
        value={value}
        placeholder="Tìm khách hàng"
        style={{ width: 400 }}
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        onSearch={handleSearch}
        onChange={handleChange}
        notFoundContent={null}
        size="large"
        allowClear={true}
      >
        {options}
      </Select>
      <SellDrawer />
    </div>
  );
};

export default SellFilter;
