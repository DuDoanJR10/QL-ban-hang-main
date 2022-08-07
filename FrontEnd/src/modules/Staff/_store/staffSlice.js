import { createSlice } from '@reduxjs/toolkit'

const staffSlice = createSlice({
  name: 'staff',
  initialState: { 
    listStaff: [], 
    modalAdd: false, 
    modalUpdate: {
      view: false,
      codeStaff: '',
      nameStaff: '',
      phoneStaff: '',
      username: '',
      password: ''
    }, 
    modalRemove: {
      view: false,
      codeStaff: '',
      nameStaff: '',
      username: '',
    } 
  },
  reducers: {
    setListStaff(state, action) {
      state.listStaff = action.payload
    },
    setModalAdd(state, action) {
      state.modalAdd = action.payload
    },
    setModalUpdate(state, action) {
      state.modalUpdate = { ...action.payload }
    },
    setModalRemove(state, action) {
      state.modalRemove = { ...action.payload }
    }
  }
})

export const { setModalAdd , setModalUpdate, setListStaff, setModalRemove } = staffSlice.actions

export default staffSlice.reducer