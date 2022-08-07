import { APP_CONFIG } from 'utils/constants';
export const COLLAPSE_SIDEBAR = 'COLLAPSE_SIDEBAR';
export const REGEX_PHONE = /((09|03|07|08|05|02)+([0-9]{8})\b)/g;
export const REGEX_PASSWORD = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
export const DEFAULT_IMAGE = `${APP_CONFIG.appUrl}img/202103170918030555-600px-no_image_available.svg.png`;
export const VALIDATE_MESSAGES = {
  required: 'Vui lòng nhập ${label}',
  min: '${label} phải tối thiểu ${min} kí tự',
  max: '${label} tối đa ${min} kí tự',
  types: {
    email: '${label} chưa đúng định dạng',
    number: '${label} chưa đúng định dạng',
  },
  number: {
    range: 'Giá trị ${label} cần giữa ${min} và ${max}',
  },
  pattern: '1111111111111111'
};
export const PAGE_SIZE = 10;
export const KEY = {
  SAVE: 'save',
  CLOSE: 'close',
  EDIT: 'edit',
  ADD: 'add',
  DETAIL: 'detail',
  DELETE: 'delete',
  SUCCESS: 'success',
  ERROR: 'error',
  FAILED: 'failed',
  CHANGE_STATUS: 'change_status',
  CHANGE_PARAMS: 'change_params',
  CHANGE_TABPANEL: 'change_tabpanel',
  EN: 'en',
  VI: 'vi',
  REPLY_COMMENT: 'reply_comment',
  SCHEDULE: 'schedule',
  SERVICE: 'service',
  SKIN_DIARY: 'skin_diary',
  SURVEY_HISTORY: 'survey_history',
  ALL: 'all',
  COORDINATOR: 'coordinator',
  NOT_COORDINATOR: 'not_coordinator',
}
export const DEFAULT_PAGINATION = {
  totalPage: 1,
  pageSize: 10,
  pageIndex: 1,
  totalRecords: 1,
}
export const OPTIONS_GENDER = [
  { label: 'Nam', value: 1 },
  { label: 'Nữ', value: 0 },
  { label: 'Tất cả', value: 2 },
];
