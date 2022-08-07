export const MODULE_DASHBOARD = 'dashboard'
export const MODULE_BOOKING = 'booking'
export const MODULE_CLINICS = 'clinics'
export const MODULE_COMMENT = 'comment'
export const MODULE_CUSTOMER = 'customer'
export const MODULE_NEWS = 'news'
export const MODULE_BEAUTY_TIP = 'beautyTip'
export const MODULE_QA = 'QA'
export const MODULE_PRODUCT = 'product'
export const MODULE_PRODUCT_CATEGORY = 'productCategory'
export const MODULE_SERVICE = 'service'
export const MODULE_SURVEY = 'survey'
export const MODULE_ROLES = 'roles'
export const MODULE_USER = 'user'
export const MODULE_USER_ROLE = 'userRole'
export const ALLOW_READ = 'allowRead'
export const ALLOW_WRITE = 'allowWrite'
export const ALLOW_DELETE = 'allowDelete'
export const ALLOW_EDIT = 'allowEdit'
export const ALLOW_EXPORT = 'allowExport'
export const ALLOW_IMPORT = 'allowImport'
export const ADMIN_NAME = 'Admin'

export const ALL_MODULES = [
  {
    title: 'Quản lý khách hàng',
    key: MODULE_CUSTOMER,
    moduleFunctionId: 1,
    children: [
      {
        title: 'Xem chi tiết khách hàng',
        key: MODULE_CUSTOMER + ALLOW_READ,
      },
      {
        title: 'Sửa khách hàng',
        key: MODULE_CUSTOMER + ALLOW_EDIT,
      },
      {
        title: 'Xóa khách hàng',
        key: MODULE_CUSTOMER + ALLOW_DELETE,
      },
    ],
  },
  {
    title: 'Quản lý phòng khám',
    key: MODULE_CLINICS,
    moduleFunctionId: 2,
    children: [
      {
        title: 'Xem chi tiết phòng khám',
        key: MODULE_CLINICS + ALLOW_READ,
      },
      {
        title: 'Thêm mới phòng khám',
        key: MODULE_CLINICS + ALLOW_WRITE,
      },
      {
        title: 'Sửa phòng khám',
        key: MODULE_CLINICS + ALLOW_EDIT,
      },
      {
        title: 'Xóa phòng khám',
        key: MODULE_CLINICS + ALLOW_DELETE,
      },
    ],
  },
  {
    title: 'Quản lý khảo sát',
    key: MODULE_SURVEY,
    moduleFunctionId: 3,
    children: [
      {
        title: 'Xem chi tiết khảo sát',
        key: MODULE_SURVEY + ALLOW_READ,
      },
      {
        title: 'Xóa khảo sát',
        key: MODULE_SURVEY + ALLOW_DELETE,
      },
      {
        title: 'Sửa khảo sát',
        key: MODULE_SURVEY + ALLOW_EDIT,
      },
    ],
  },
  {
    title: 'Quản lý lịch đặt',
    key: MODULE_BOOKING,
    moduleFunctionId: 4,
    children: [
      {
        title: 'Xem chi tiết lịch đặt',
        key: MODULE_BOOKING + ALLOW_READ,
      },
      {
        title: 'Xóa lịch đặt',
        key: MODULE_BOOKING + ALLOW_DELETE,
      },
      {
        title: 'Sửa lịch đặt',
        key: MODULE_BOOKING + ALLOW_EDIT,
      },
    ],
  },
  {
    title: 'Danh mục sản phẩm',
    key: MODULE_PRODUCT_CATEGORY,
    moduleFunctionId: 6,
    children: [
      {
        title: 'Xem chi tiết danh mục sản phẩm',
        key: MODULE_PRODUCT_CATEGORY + ALLOW_READ,
      },
      {
        title: 'Thêm mới danh mục sản phẩm',
        key: MODULE_PRODUCT_CATEGORY + ALLOW_WRITE,
      },
      {
        title: 'Sửa danh mục sản phẩm',
        key: MODULE_PRODUCT_CATEGORY + ALLOW_EDIT,
      },
      {
        title: 'Xóa danh mục sản phẩm',
        key: MODULE_PRODUCT_CATEGORY + ALLOW_DELETE,
      },
    ],
  },
  {
    title: 'Sản phẩm',
    key: MODULE_PRODUCT,
    moduleFunctionId: 5,
    children: [
      {
        title: 'Xem chi tiết sản phẩm',
        key: MODULE_PRODUCT + ALLOW_READ,
      },
      {
        title: 'Thêm mới sản phẩm',
        key: MODULE_PRODUCT + ALLOW_WRITE,
      },
      {
        title: 'Sửa sản phẩm',
        key: MODULE_PRODUCT + ALLOW_EDIT,
      },
      {
        title: 'Xóa  sản phẩm',
        key: MODULE_PRODUCT + ALLOW_DELETE,
      },
    ],
  },
  {
    title: 'Dịch vụ',
    key: MODULE_SERVICE,
    moduleFunctionId: 7,
    children: [
      {
        title: 'Xem chi tiết dịch vụ',
        key: MODULE_SERVICE + ALLOW_READ,
      },
      {
        title: 'Thêm mới dịch vụ',
        key: MODULE_SERVICE + ALLOW_WRITE,
      },
      {
        title: 'Sửa dịch vụ',
        key: MODULE_SERVICE + ALLOW_EDIT,
      },
      {
        title: 'Xóa dịch vụ',
        key: MODULE_SERVICE + ALLOW_DELETE,
      },
    ],
  },
  {
    title: 'Tin tức',
    key: MODULE_NEWS,
    moduleFunctionId: 8,
    children: [
      {
        title: 'Xem chi tiết tin tức',
        key: MODULE_NEWS + ALLOW_READ,
      },
      {
        title: 'Thêm mới tin tức',
        key: MODULE_NEWS + ALLOW_WRITE,
      },
      {
        title: 'Sửa tin tức',
        key: MODULE_NEWS + ALLOW_EDIT,
      },
      {
        title: 'Xóa tin tức',
        key: MODULE_NEWS + ALLOW_DELETE,
      },
    ],
  },
  {
    title: 'Bí quyết làm đẹp',
    key: MODULE_BEAUTY_TIP,
    moduleFunctionId: 9,
    children: [
      {
        title: 'Xem chi tiết bài viết',
        key: MODULE_BEAUTY_TIP + ALLOW_READ,
      },
      {
        title: 'Thêm mới bài viết',
        key: MODULE_BEAUTY_TIP + ALLOW_WRITE,
      },
      {
        title: 'Sửa bài viết',
        key: MODULE_BEAUTY_TIP + ALLOW_EDIT,
      },
      {
        title: 'Xóa bài viết',
        key: MODULE_BEAUTY_TIP + ALLOW_DELETE,
      },
    ],
  },
  {
    title: 'Q&A',
    key: MODULE_QA,
    moduleFunctionId: 10,
    children: [
      {
        title: 'Xem chi tiết Q&A',
        key: MODULE_QA + ALLOW_READ,
      },
      {
        title: 'Thêm mới Q&A',
        key: MODULE_QA + ALLOW_WRITE,
      },
      {
        title: 'Sửa Q&A',
        key: MODULE_QA + ALLOW_EDIT,
      },
      {
        title: 'Xóa Q&A',
        key: MODULE_QA + ALLOW_DELETE,
      },
    ],
  },
  {
    title: 'Quản lý user',
    key: MODULE_USER,
    moduleFunctionId: 11,
    children: [
      {
        title: 'Xem chi tiết user',
        key: MODULE_USER + ALLOW_READ,
      },
      {
        title: 'Thêm mới user',
        key: MODULE_USER + ALLOW_WRITE,
      },
      {
        title: 'Sửa user',
        key: MODULE_USER + ALLOW_EDIT,
      },
      {
        title: 'Xóa user',
        key: MODULE_USER + ALLOW_DELETE,
      },
    ],
  },
  {
    title: 'Phân quyền vai trò',
    key: MODULE_USER_ROLE,
    moduleFunctionId: 12,
    children: [
      {
        title: 'Xem chi tiết vai trò',
        key: MODULE_USER_ROLE + ALLOW_READ,
      },
      {
        title: 'Thêm mới vai trò',
        key: MODULE_USER_ROLE + ALLOW_WRITE,
      },
      {
        title: 'Sửa vai trò',
        key: MODULE_USER_ROLE + ALLOW_EDIT,
      },
      {
        title: 'Xóa vai trò',
        key: MODULE_USER_ROLE + ALLOW_DELETE,
      },
    ],
  },
  {
    title: 'Quản lý bình luận',
    key: MODULE_COMMENT,
    moduleFunctionId: 13,
    children: [
      {
        title: 'Xem chi tiết bình luận',
        key: MODULE_COMMENT + ALLOW_READ,
      },
      {
        title: 'Sửa bình luận',
        key: MODULE_COMMENT + ALLOW_EDIT,
      },
      {
        title: 'Xóa bình luận',
        key: MODULE_COMMENT + ALLOW_DELETE,
      },
    ],
  },
];

export default {
  MODULE_DASHBOARD,
  MODULE_BOOKING,
  MODULE_CLINICS,
  MODULE_COMMENT,
  MODULE_CUSTOMER,
  MODULE_ROLES,
  MODULE_NEWS,
  MODULE_PRODUCT,
  MODULE_SERVICE,
  MODULE_SURVEY,
  MODULE_USER,
  MODULE_QA,
  MODULE_USER_ROLE,
  ALLOW_READ,
  ALLOW_WRITE,
  ALLOW_DELETE,
  ALLOW_EDIT,
  ALLOW_EXPORT,
  ALLOW_IMPORT,
  ADMIN_NAME,
  ALL_MODULES
}

