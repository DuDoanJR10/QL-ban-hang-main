import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCustomSize } from 'modules/Commons/_store/commonSlice';
import { Menu, Dropdown, Typography } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { destroyLogged, getAuth } from 'utils/jwt';
import useRouter from 'hooks/useRouter';
import useCurrentWidth from 'hooks/useCurrentWidth';
import Logo from 'src/assets/images/logo2.png';
import { useTranslation } from 'react-i18next';
import { isEmpty } from 'helpers/funcs';
import { saveAuth } from 'utils/jwt';

const { Text } = Typography;

const Header = () => {
  //Hook init
  const { i18n } = useTranslation();
  const router = useRouter();
  const [language, setLanguage] = useState('Vietnamese');
  const authInfo = getAuth();
  const breakpoint = 1367;
  const width = useCurrentWidth();
  const dispatch = useDispatch();
  const changeLanguage = (key) => {
    switch (key) {
    case 'vi':
      setLanguage('Vietnamese');
      i18n.changeLanguage(key);
      break;
    case 'en':
      setLanguage('English');
      i18n.changeLanguage(key);
      break;
    }
  };
  const menu = (
    <Menu
      onClick={(item) => {
        changeLanguage(item.key);
      }}
    >
      <Menu.Item key="vi">Vietnamese</Menu.Item>
      {/* <Menu.Item key="Japanese">Japanese</Menu.Item> */}
      <Menu.Item key="en">English</Menu.Item>
    </Menu>
  );
  const menuUser = (
    <Menu onClick={() => logout()}>
      <Menu.Item key="Vietnamese">Đăng xuất</Menu.Item>
    </Menu>
  );
  useEffect(() => {
    width < breakpoint
      ? dispatch(setCustomSize('middle'))
      : dispatch(setCustomSize('large'));
  }, [width]);

  const logout = async () => {
    await destroyLogged();
    saveAuth(null);
    // console.log(getAccessToken(), 'TOKEN');
    router.push('/login');
  };
  return (
    <header className="header d-flex justify-content-between align-items-center">
      <div className="logo">
        <img src={Logo} height={50} />
      </div>
      <div className="d-flex header__right">
        <Dropdown
          className="header__right-item"
          overlay={menu}
          trigger={['click']}
          onClick={(e) => e.preventDefault()}
        >
          <Text>
            {language} <DownOutlined />
          </Text>
        </Dropdown>
        {/* <Badge count={9} className="header__right-item mt-2">
          <i className="icon-bell2"></i>
        </Badge> */}
        <Dropdown
          overlay={menuUser}
          trigger={['click']}
          onClick={(e) => e.preventDefault()}
        >
          <div className="cusor-pointer d-flex-center">
            <i className="icon-user-circle-o pr-1"></i>
            <Text strong>
              {authInfo && !isEmpty(authInfo) ? authInfo : 'Update'}
            </Text>
          </div>
        </Dropdown>
      </div>
    </header>
  );
};

export default Header;
