import React from 'react';
import '../_style/style.scss';
import GuestFillter from '../_components/GuestFillter';
import GuestTable from '../_components/GuestTable';
import GuestModalAdd from '../_components/GuestModalAdd';
import GuestModalUpdate from '../_components/GuestModalUpdate';
import GuestModalRemove from '../_components/GustModalRemove';
import { Divider } from 'antd';

const DanhMuc = () => {
  return (
    <div>
      <GuestFillter />
      <Divider />
      <GuestTable />
      <GuestModalAdd />
      <GuestModalUpdate />
      <GuestModalRemove />
    </div>
  );
};

export default DanhMuc;
