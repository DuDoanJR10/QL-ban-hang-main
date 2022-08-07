import { createSlice } from '@reduxjs/toolkit'

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: { 
    listToday: [],
  },
  reducers: {
    setListToday(state, action) {
      state.listToday = action.payload
    }
  }
})

export const { setListToday } = dashboardSlice.actions

export default dashboardSlice.reducer