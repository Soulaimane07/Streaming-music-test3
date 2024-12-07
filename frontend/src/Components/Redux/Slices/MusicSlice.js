import { createSlice } from '@reduxjs/toolkit';

export const musicSlice = createSlice({
  name: 'music',
  initialState: {
    data: null,
    isPlaying: false,
    isDetails: false
  },
  reducers: {
    play: (state, action) => {
      state.data = action.payload
      state.isPlaying = true
      console.log("==> Played");
    },
    pause: (state) => {
        state.isPlaying = false
        console.log("==> Paused");
    },
    closeDetails: (state) => {
      state.isDetails = false
      console.log("==> closed");
    },
    openDetails: (state) => {
      state.isDetails = true
      console.log("==> opened");
    },
  },
});

export const { play, pause, openDetails, closeDetails } = musicSlice.actions;

export default musicSlice.reducer;
