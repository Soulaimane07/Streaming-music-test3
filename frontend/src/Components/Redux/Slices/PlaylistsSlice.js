import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { PlaylistServiceUrl } from '../../Functions';

// Asynchronous thunk to fetch playlists
export const getPlaylists = createAsyncThunk('catalog/getPlaylists', async () => {
  const response = await fetch(`${PlaylistServiceUrl}/playlists`); // Replace with your API endpoint
  const data = await response.json();
  return data; // Return the fetched data
});

export const getPlaylist = createAsyncThunk('catalog/getPlaylist', async (id) => {
  const response = await fetch(`${PlaylistServiceUrl}/playlists/${id}`); // Replace with your API endpoint
  const data = await response.json();
  return data; // Return the fetched data
});

export const playlistsSlice = createSlice({
  name: 'playlists',
  initialState: {
    data: [],
    playlist: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getPlaylists.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getPlaylists.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload; // Set the fetched artists data to state
    })
    .addCase(getPlaylists.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message; // Store the error message
    })
    
    .addCase(getPlaylist.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getPlaylist.fulfilled, (state, action) => {
      state.loading = false;
      state.playlist = action.payload; // Set the fetched artists data to state
    })
    .addCase(getPlaylist.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message; // Store the error message
    });
  },
});

export default playlistsSlice.reducer;
