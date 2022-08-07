import { createSlice } from '@reduxjs/toolkit'
const commonSlice = createSlice({
  name: 'common',
  initialState: { collapse: false, customSize: 'large' , loadingPage: false  },
  province: [],
  district: [],
  ward: [],
  reducers: {
    collapseLayout(state) {
      state.collapse = !state.collapse;
    },
    setCustomSize(state, action) {
      state.customSize = action.payload
    },
    setLoadingPage(state, action) {
      state.loadingPage = action.payload
    },
  }
})

export const {
  collapseLayout,
  setCustomSize,
  setLoadingPage
} = commonSlice.actions;

export default commonSlice.reducer