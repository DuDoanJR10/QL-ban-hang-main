import { combineReducers } from 'redux';
import common from 'modules/Commons/_store/commonSlice';
import auth from 'modules/Auth/_store/authSlice';
import guest from '../modules/Guest/_store/guestSlice';
import staff from '../modules/Staff/_store/staffSlice';
import invoice from '../modules/Invoice/_store/invoiceSlice';
import category from '../modules/DanhMuc/_store/categorySlice';
import dashboard from '../modules/Dashboard/_store/dashboardSlice'
import sell from '../modules/SELL/_store/sellSlice'

const rootReducer = combineReducers({
  common,
  auth,
  category,
  guest,
  staff,
  invoice,
  dashboard,
  sell
});

export default rootReducer;
