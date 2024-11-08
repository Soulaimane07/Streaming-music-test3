import { configureStore } from '@reduxjs/toolkit';
import userReducer from './Slices/UserSlice';
import musicReducer from './Slices/MusicSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    music: musicReducer,
  },
});

export default store;
