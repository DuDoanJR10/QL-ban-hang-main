import { createSlice } from '@reduxjs/toolkit';

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    loadingTable: false,
    listCategory: [],
    modalAdd: {
      view: false,
    },
    modalUpdate: {
      view: false,
      codeProduct: '',
      productName: '',
      priceCapital: '',
      priceSell: '',
      inventory: '',
      filePath: ''
    },
    modalRemove: {
      view: false,
      codeProduct: '',
    },
  },
  reducers: {
    setLoadingTable(state, action) {
      state.loadingTable = action.payload;
    },
    setListCategory(state, action) {
      state.listCategory = action.payload;
    },
    setmodalAdd(state, action) {
      state.modalAdd = action.payload;
    },
    setmodalUpdate(state, action) {
      state.modalUpdate = action.payload;
    },
    setmodalRemove(state, action) {
      state.modalRemove = action.payload;
    },
  },
});

export const { 
  setListCategory, 
  setmodalAdd, 
  setmodalUpdate, 
  setmodalRemove, 
  setLoadingTable 
} = categorySlice.actions;

export default categorySlice.reducer;
