import { createSlice } from '@reduxjs/toolkit';

export const musicSlice = createSlice({
  name: 'music',
  initialState: {
    data: {
      musicName: "Euphoria",
      musicImage: '../images/song.jpg',
      artists: {
        image: '../images/singer.jpg',
        name: "Kendrick Lamar"
      }
    },
    isPlaying: true,
    isDetails: true
  },
  reducers: {
    play: (state, action) => {
      state.data = {
        musicName: "Euphoria",
        musicImage: '../images/song.jpg',
        artists: {
          image: '../images/singer.jpg',
          name: "Kendrick Lamar"
        }
      }
      state.isPlaying = true
      state.isDetails = true
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
  },
});

export const { play, pause, closeDetails } = musicSlice.actions;

export default musicSlice.reducer;
