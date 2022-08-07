import axios from 'axios';
import cookie from 'js-cookie'

export const getListInvoice = () => {
  return axios.post('http://localhost:3000/api/invoice/get-list', {
    tokenAdmin: cookie.get('ustkrohtodev')
  })
}

export const addInvoice = (data) => {
  return axios.post('http://localhost:3000/api/invoice/register', {
    tokenAdmin: cookie.get('ustkrohtodev'),
    ...data
  })
}

export const updateInvoice = (data) => {
  return axios.post('http://localhost:3000/api/invoice/update', {
    tokenAdmin: cookie.get('ustkrohtodev'),
    ...data
  })
}

export const removeInvoice = (codeInvoice) => {
  return axios.post('http://localhost:3000/api/invoice/remove', {
    tokenAdmin: cookie.get('ustkrohtodev'),
    codeInvoice
  })
}

export const findInvoice = (find) => {
  return axios.post('http://localhost:3000/api/invoice/find', {
    tokenAdmin: cookie.get('ustkrohtodev'),
    find
  })
}

export const findInvoiceDate = (find) => {
  return axios.post('http://localhost:3000/api/invoice/findDate', {
    tokenAdmin: cookie.get('ustkrohtodev'),
    find
  })
}