import { createSlice } from '@reduxjs/toolkit'

const invoiceSlice = createSlice({
  name: 'invoice',
  initialState: { 
    listInvoice: [], 
    modalInfo: {
      view: false,
      codeInvoice: '',
      createAt: '',
      nameGuest: '',
      addressGuest: '',
      phoneGuest: '',
      nameSeller: '',
      paymentType: '',
      totalMoney: '',
      productsBuying: []
    }, 
    modalRemove: {
      view: false,
      codeInvoice: '',
    } 
  },
  reducers: {
    setListInvoice(state, action) {
      state.listInvoice = action.payload
    },
    setModalInfo(state, action) {
      state.modalInfo = { ...action.payload }
    },
    setModalRemove(state, action) {
      state.modalRemove = { ...action.payload }
    }
  }
})

export const { setModalInfo, setListInvoice, setModalRemove } = invoiceSlice.actions

export default invoiceSlice.reducer