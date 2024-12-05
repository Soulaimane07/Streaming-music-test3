import { configureStore } from '@reduxjs/toolkit';
import userReducer from './Slices/UserSlice';
import musicReducer from './Slices/MusicSlice';
import artistsReducer from './Slices/ArtistsSlice';
import songsReducer from './Slices/SongsSlice';
import SearchReducer from './Slices/SearchSlice';
import GenresReducer from './Slices/GenresSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    music: musicReducer,
    artists: artistsReducer,
    songs: songsReducer,
    searchBox: SearchReducer,
    genres: GenresReducer,
  },
});

export default store;
