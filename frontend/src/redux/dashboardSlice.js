import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products:[{}]
}

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setProducts: (state, action) =>{
      state.products = action.payload
    }
  },
});

export const { setProducts } = dashboardSlice.actions;
export default dashboardSlice.reducer;