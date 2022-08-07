import React from 'react';
import { Layout } from 'antd';
import navigation from 'src/_nav';
import { useSelector, useDispatch } from 'react-redux';
import { collapseLayout } from 'modules/Commons/_store/commonSlice';
import PermissionRoute from 'src/middleware/PermissionRoute';
// import Star from 'src/assets/images/icons/star.svg'

const { Sider } = Layout;

const Sidebar = () => {
  const collapse = useSelector((state) => state.common.collapse);
  const dispatch = useDispatch();

  const toggleSidebar = () => {
    dispatch(collapseLayout());
  };

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapse}
      className="site-layout-background"
    >
      {/* <div className="logo">
        <img src={Logo} />
      </div> */}

      <PermissionRoute navConfig={navigation} theme="light" mode="inline" />
      <i
        onClick={toggleSidebar}
        className={
          collapse
            ? 'icon-circle-left icon-nav icon-nav__close'
            : 'icon-circle-left icon-nav icon-nav__open'
        }
      ></i>
    </Sider>
  );
};

export default Sidebar;
