import { Divider } from 'antd';
import React from 'react';
import Filter from '../_components/Filter';
import CategoryModalAdd from '../_components/ModalAdd';
import ModalRemove from '../_components/ModalRemove';
import ModalUpdate from '../_components/ModalUpdate';
import TableData from '../_components/TableData';
import '../_styles/style.scss';

const ProductDetail = () => {
  return (
    <div className="panel p-16">
      <Filter />
      <Divider />
      <TableData />
      <CategoryModalAdd />
      <ModalUpdate />
      <ModalRemove />
    </div>
  );
};

export default ProductDetail;
