import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CatalogServiceUrl } from '../../Functions';

// Asynchronous thunk to fetch artists
export const getSongs = createAsyncThunk('catalog/getSongs', async () => {
  const response = await fetch(`${CatalogServiceUrl}/songs`); // Replace with your API endpoint
  const data = await response.json();
  return data; // Return the fetched data
});

export const songsSlice = createSlice({
  name: 'songs',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSongs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSongs.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; // Set the fetched artists data to state
      })
      .addCase(getSongs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Store the error message
      });
  },
});

export default songsSlice.reducer;
