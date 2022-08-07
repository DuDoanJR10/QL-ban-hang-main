import { createSlice } from '@reduxjs/toolkit';

const guestSlice = createSlice({
  name: 'guest',
  initialState: {
    modalAdd: false,
    modalUpdate: false,
    modalRemove: { view: false, codeGust: '', nameGust: '' },
    fillterUpdate: {
      codeGust: '',
      nameGust: '',
      phoneGust: '',
      addressGust: '',
    },
    listGuest: [],
  },
  reducers: {
    setModalAdd(state, action) {
      state.modalAdd = action.payload;
    },
    setModalUpdate(state, action) {
      state.modalUpdate = action.payload;
    },
    setListGuest(state, action) {
      state.listGuest = action.payload;
    },
    addListGust(state, action) {
      state.listGuest = [...state.listGuest, action.payload];
    },
    setFillUpdate(state, action) {
      state.fillterUpdate = { ...action.payload };
    },
    setModalRemove(state, action) {
      state.modalRemove = { ...action.payload };
    },
  },
});

export const {
  setModalAdd,
  setModalUpdate,
  setListGuest,
  addListGust,
  setFillUpdate,
  setModalRemove,
} = guestSlice.actions;

export default guestSlice.reducer;
