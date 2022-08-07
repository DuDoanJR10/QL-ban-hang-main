import React from 'react';
import { Input, Dropdown, Menu } from 'antd'
import { SearchOutlined, PieChartOutlined, SettingOutlined, RightCircleOutlined } from '@ant-design/icons'

const SellHeader = () => {
  const handleButtonClick = () => {
  };

  const handleMenuClick = () => {
  };

  const menu = (
    <Menu
      onClick={handleMenuClick}
      items={[
        {
          label: 'Báo cáo cuối ngày',
          key: '1',
          icon: <PieChartOutlined />,
        },
        {
          label: 'Đổi mật khẩu',
          key: '2',
          icon: <SettingOutlined />,
        },
        {
          label: 'Đăng xuất',
          key: '3',
          icon: <RightCircleOutlined />,
        },
      ]}
    />
  );

  return (
    <div className='sell__header d-flex-center justify-content-between'>
      <div className='sell__header-find'>
        <Input addonBefore={<SearchOutlined />} addonAfter="" placeholder="Tìm hàng hóa" />
      </div>

      <div className='sell__header-account'>
        <Dropdown.Button onClick={handleButtonClick} overlay={menu}>
                    0399801978
        </Dropdown.Button>
      </div>
    </div>
  )
}

export default SellHeader;
