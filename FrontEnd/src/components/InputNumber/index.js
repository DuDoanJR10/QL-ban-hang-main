import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Input} from 'antd'

const InputNumber = ({ value = 0, onChange , defaultValue,  style, ...props }) => {
  const [number, setNumber] = useState(defaultValue || value);
  const onNumberChange = (e) => {
    const newNumber = parseInt(e.target.value || '0', 10);
    if (Number.isNaN(number)) {
      return;
    }
    setNumber(newNumber);
    onChange(newNumber)
  };
  // '.' at the end or only '-' in the input box.
  return (
    <span>
      <Input
        type="text"
        value={value || number}
        onChange={onNumberChange}
        style={style}
        {...props}
      />
    </span>
  );
};

InputNumber.propTypes = {
  onChange: PropTypes.func,
  style: PropTypes.any,
  value: PropTypes.any,
  defaultValue: PropTypes.any,
};
InputNumber.defaultValue = {
  defaultValue: null
}
export default InputNumber;
