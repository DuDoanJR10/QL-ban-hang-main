export default {
  items: [
    {
      name: 'Tổng quan',
      nameEn: 'Dashboard',
      url: '/',
      icon: 'icon-home',
      children: [],
    },
    {
      name: 'Hàng Hóa',
      nameEn: 'Goods',
      url: '/hang-hoa',
      icon: 'icon-cart',
      children: [
        {
          name: 'Sản phẩm',
          nameEn: 'Product',
          url: '/san-pham',
          icon: 'icon-menu',
          children: [],
        },
        {
          name: 'Thiết lập giá',
          nameEn: 'Price setting',
          url: '/thiet-lap-gia',
          icon: 'icon-coin-dollar',
          children: [],
        },
      ],
    },
    {
      name: 'Hóa Đơn',
      nameEn: 'Receipt',
      url: '/hoa-don',
      icon: 'icon-file-text2',
      children: [],
    },
    {
      name: 'Khách hàng',
      nameEn: 'Customer',
      url: '/khach-hang',
      icon: 'icon-users',
      children: [],
    },
    {
      name: 'Nhân Viên',
      nameEn: 'Staff',
      url: '/nhan-vien',
      icon: 'icon-user-check',
      children: [],
    },
  ],
};
