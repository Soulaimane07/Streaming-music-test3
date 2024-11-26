import { configureStore } from '@reduxjs/toolkit';
import userReducer from './Slices/UserSlice';
import musicReducer from './Slices/MusicSlice';
import artistsReducer from './Slices/ArtistsSlice';
import songsReducer from './Slices/SongsSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    music: musicReducer,
    artists: artistsReducer,
    songs: songsReducer,
  },
});

export default store;
