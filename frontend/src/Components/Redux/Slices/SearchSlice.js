import { createSlice } from '@reduxjs/toolkit';

export const searchBoxSlice = createSlice({
  name: 'searchBox',
  initialState: {
    data: "",
    openned: false
  },
  reducers: {
    open: (state, action) => {
      state.openned = true;
      state.data = action.payload;
    },
    close: (state) => {
      state.openned = false;
      state.data = "";
    },
  },
});

export const { open, close } = searchBoxSlice.actions;
export default searchBoxSlice.reducer;
