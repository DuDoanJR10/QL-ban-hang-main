import { notification } from 'antd';
import { APP_CONFIG } from 'utils/constants';

export const getCookie = (cname) => {
  var name = cname + '';
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length + 1, c.length);
    }
  }
  return '';
};

/**
 * Set cookie
 **/
export const saveCookie = (name, value, exdays) => {
  let date = new Date();
  date.setTime(date.getTime() + exdays * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}`;
};

/**
 * Del Cookie by name
 **/
export const delCookie = (name) => {
  document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

/**
 * Check Empty data
 **/
export const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  );
};
export const formatNumber = (value) => {
  value += '';
  const list = value.split('.');
  const prefix = list[0].charAt(0) === '-' ? '-' : '';
  let num = prefix ? list[0].slice(1) : list[0];
  let result = '';
  while (num.length > 3) {
    result = `,${num.slice(-3)}${result}`;
    num = num.slice(0, num.length - 3);
  }
  if (num) {
    result = num + result;
  }
  return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`;
};

export const formatPrice = (value) => {
  return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const formatPriceVND = (value) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
    value
  );

export const validationPhone = (rule, value, callback) => {
  if (/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(value)) {
    return callback();
  }
  return callback('Số điện thoại chưa đúng định dạng');
};

export const mergeArrays = (arr1, arr2) =>
  arr1 && arr1.map((obj) => (arr2 && arr2.find((p) => p.id === obj.id)) || obj);

export const stringToSlug = (str) => {
  // Chuyển hết sang chữ thường
  str = str.toLowerCase();

  // xóa dấu
  str = str
    .normalize('NFD') // chuyển chuỗi sang unicode tổ hợp
    .replace(/[\u0300-\u036f]/g, ''); // xóa các ký tự dấu sau khi tách tổ hợp

  // Thay ký tự đĐ
  str = str.replace(/[đĐ]/g, 'd');

  // Xóa ký tự đặc biệt
  str = str.replace(/([^0-9a-z-\s])/g, '');

  // Xóa khoảng trắng thay bằng ký tự -0
  str = str.replace(/(\s+)/g, '-');

  // Xóa ký tự - liên tiếp
  str = str.replace(/-+/g, '-');

  // xóa phần dư - ở đầu & cuối
  str = str.replace(/^-+|-+$/g, '');

  // return
  return str;
};

export const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

export const allowedUserChecker = (userRoles, allowedRoles) => {
  console.log(userRoles, 'userRoles');
  console.log(allowedRoles, 'allowedRoles');
};

export const openNotificationWithIcon = (type, message) => {
  notification[type]({
    message: message,
  });
};

export const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    openNotificationWithIcon('error', 'You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    openNotificationWithIcon('error', 'Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

export const getUrlImage = (url = '') => {
  return url && url !== '' ? APP_CONFIG.appUrl + url : null;
};

export const getExpirationDate = (jwtToken) => {
  if (!jwtToken) {
    return null;
  }

  const jwt = JSON.parse(atob(jwtToken.split('.')[1]));

  // multiply by 1000 to convert seconds into milliseconds
  return (jwt && jwt.exp && jwt.exp * 1000) || null;
};

export const handleTotal = (arrayFind) => {
  let totalRevenue = 0;
  let totalOld = 0;

  arrayFind.map((invoice) => {
    totalRevenue = totalRevenue + Number(invoice.totalMoney);

    invoice.productsBuying.map((good) => {
      totalOld =
        totalOld + Number(good.amout) * Number(good.priceCapital);
    });
  });

  return [totalRevenue, totalOld];
};
