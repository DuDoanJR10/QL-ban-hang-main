export const KEY_API_FAIL = 'Error';
export const KEY = {
  SAVE: 'save',
  CLOSE: 'close',
  EDIT: 'edit',
  ADD: 'add',
  DETAIL: 'detail',
  DELETE: 'delete',
  SUCCESS: 'Success',
  ERROR: 'error',
  FAILED: 'failed',
  VI: 'vi',
  EN: 'en',
};

export const DEFAULT_PAGING = {
  pageIndex: 1,
  pageSize: 10,
  totalPage: 1,
  totalRecords: 12,
};

const typeTemplate = '${label} không đúng định dạng';

export const validateMessagesForm = {
  required: '${label} không được bỏ trống',
  types: {
    string: typeTemplate,
    method: typeTemplate,
    array: typeTemplate,
    object: typeTemplate,
    number: typeTemplate,
    date: typeTemplate,
    boolean: typeTemplate,
    integer: typeTemplate,
    float: typeTemplate,
    regexp: typeTemplate,
    email: typeTemplate,
    url: typeTemplate,
    hex: typeTemplate,
  },
};

export const listMonthName = [
  'Tháng 1',
  'Tháng 2',
  'Tháng 3',
  'Tháng 4',
  'Tháng 5',
  'Tháng 6',
  'Tháng 7',
  'Tháng 8',
  'Tháng 9',
  'Tháng 10',
  'Tháng 11',
  'Tháng 12',
];

export const listQuarter = ['1', '2', '3', '4'];
