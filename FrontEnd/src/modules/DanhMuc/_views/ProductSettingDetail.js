import { Divider } from 'antd';
import React from 'react';
import Filter from '../_components/Filter';
import CategoryModalAdd from '../_components/ModalAdd';
import ModalRemove from '../_components/ModalRemove';
import PriceSettingModalUpdate from '../_components/PriceSettingModalUpdate';
import PriceSettingTable from '../_components/PriceSettingTable';
import '../_styles/style.scss';
const ProductSettingDetail = () => {
  return (
    <div>
      <Filter />
      <Divider />
      <CategoryModalAdd />
      <PriceSettingModalUpdate />
      <ModalRemove />
      <PriceSettingTable />
    </div>
  );
};

export default ProductSettingDetail;
