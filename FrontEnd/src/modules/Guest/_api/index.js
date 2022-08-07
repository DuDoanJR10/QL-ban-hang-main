import axios from 'axios';
import cookie from 'js-cookie'

export const addGuest = (nameGust, phoneGust, addressGust) => {
  return axios.post('http://localhost:3000/api/gust/create', {
    tokenAdmin: cookie.get('ustkrohtodev'),
    nameGust,
    phoneGust,
    addressGust
  })
}

export const getListGuest = () => {
  return axios.post('http://localhost:3000/api/gust/get-list', {
    tokenAdmin: cookie.get('ustkrohtodev')
  })
}

export const updateGuest = (data) => {
  return axios.post('http://localhost:3000/api/gust/update', {
    tokenAdmin: cookie.get('ustkrohtodev'),
    ...data
  })
}

export const removeGuest = (codeGust) => {
  return axios.post('http://localhost:3000/api/gust/remove', {
    tokenAdmin: cookie.get('ustkrohtodev'),
    codeGust
  })
}

export const findGuest = (find) => {
  return axios.post('http://localhost:3000/api/gust/find', {
    tokenAdmin: cookie.get('ustkrohtodev'),
    find
  })
}