import React from 'react';
// import PermissionData from './middleware/PermissionData'
import * as AUTH from 'auth/_store/constants';
const Dashboard = React.lazy(() => import('dashboard/_views'));
const Product = React.lazy(() =>
  import('./modules/DanhMuc/_views/ProductDetail')
);
const PriceSetting = React.lazy(() =>
  import('./modules/DanhMuc/_views/ProductSettingDetail')
);
const Guest = React.lazy(() => import('../src/modules/Guest/_view'));
const Staff = React.lazy(() => import('../src/modules/Staff/_view'));
const Invoice = React.lazy(() => import('../src/modules/Invoice/_view'));

const routes = [
  { path: '/', exact: true, name: AUTH.MODULE_DASHBOARD, component: Dashboard },
  {
    path: '/san-pham',
    exact: true,
    name: AUTH.MODULE_DASHBOARD,
    component: Product,
  },
  {
    path: '/thiet-lap-gia',
    exact: true,
    name: AUTH.MODULE_DASHBOARD,
    component: PriceSetting,
  },
  {
    path: '/khach-hang',
    exact: true,
    name: AUTH.MODULE_DASHBOARD,
    component: Guest,
  },
  {
    path: '/nhan-vien',
    exact: true,
    name: AUTH.MODULE_DASHBOARD,
    component: Staff,
  },
  {
    path: '/hoa-don',
    exact: true,
    name: AUTH.MODULE_DASHBOARD,
    component: Invoice,
  },
];

export default routes;
