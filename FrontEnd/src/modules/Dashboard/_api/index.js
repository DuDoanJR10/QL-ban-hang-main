import axios from 'axios';
import cookie from 'js-cookie';

export const GetInvoiceToday = (find) => {
  return axios.post('http://localhost:3000/api/invoice/findDate', {
    tokenAdmin: cookie.get('ustkrohtodev'),
    find
  })
}

export const GetInvoiceChart = () => {
  return axios.post('http://localhost:3000/api/invoice/findChart', {
    tokenAdmin: cookie.get('ustkrohtodev'),
  })
}

