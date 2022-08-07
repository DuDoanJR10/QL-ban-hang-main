import React from 'react';
import '../_style/style.scss';
import StaffFillter from '../_components/StaffFillter';
import StaffTable from '../_components/StaffTable';
import StaffModalAdd from '../_components/StaffModalAdd';
import StaffModalUpdate from '../_components/StaffModalUpdate';
import StaffModalRemove from '../_components/StaffModalRemove';
import { Divider } from 'antd';

const DanhMuc = () => {
  return (
    <div>
      <StaffFillter />
      <Divider />
      <StaffTable />
      <StaffModalAdd />
      <StaffModalUpdate />
      <StaffModalRemove />
    </div>
  );
};

export default DanhMuc;
