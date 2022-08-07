import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
const SubMenu = Menu.SubMenu;
import { useTranslation } from 'react-i18next';
import { KEY } from '../store/common/constants';
const PermissionRoute = (props) => {
  const { i18n } = useTranslation();

  const permissions = [
    { method: 'GET', path: '/' },
    { method: 'POST', path: '/login' },
    { method: 'GET', path: '/config' },
    { method: 'PUT', path: '/config/info' },
    { method: 'PUT', path: '/config/layout' },
  ];

  if (permissions !== '' && permissions !== undefined && permissions !== null) {
    let propsData = props;
    let result;
    if (propsData.navConfig.items.length > 0) {
      result = (
        <Menu
          theme={props.theme}
          mode={props.mode}
          defaultSelectedKeys={props.defaultSelectedKeys}
        >
          {propsData.navConfig.items.map((item, index) => {
            if (item.children && item.children.length > 0) {
              if (item.children.length > 0) {
                return (
                  <SubMenu
                    key={index}
                    title={
                      <span className="d-flex align-items-center">
                        <span className={`ant-menu-item-icon nav-icon ${item.icon}`}> </span>
                        <span>
                          {i18n.language === KEY.VI ? item.name : item.nameEn}
                        </span>
                      </span>
                    }
                  >
                    {item.children.map((child, childIndex) => {
                      return (
                        <Menu.Item key={index + 'sub' + childIndex}>
                          <Link to={child.url}>
                            {i18n.language === KEY.VI
                              ? child.name
                              : child.nameEn}
                          </Link>
                        </Menu.Item>
                      );
                    })}
                  </SubMenu>
                );
              }
            }
            // if (indexItem > -1) {
            return (
              <Menu.Item key={index}>
                <Link to={item.url} className="d-flex align-items-center">
                  <span
                    className={`ant-menu-item-icon nav-icon ${item.icon}`}
                  ></span>
                  <span>
                    {i18n.language === KEY.VI ? item.name : item.nameEn}
                  </span>
                </Link>
              </Menu.Item>
            );
            // }
          })}
        </Menu>
      );
    }
    return result;
  } else {
    return false;
  }
};

export default PermissionRoute;
