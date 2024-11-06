import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: null,
    logged: false
  },
  reducers: {
    login: (state, action) => {
      state.data = action.payload
      state.logged = true
      localStorage.setItem("spotify-user", JSON.stringify(action.payload))
      console.log("==> logged in");
    },
    logout: (state) => {
      state.data = null
      state.logged = false
      localStorage.removeItem("spotify-user")
      console.log("==> logged out");
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
