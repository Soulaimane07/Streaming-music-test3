import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CatalogServiceUrl } from '../../Functions';

// Asynchronous thunk to fetch artists
export const getArtists = createAsyncThunk('catalog/getArtists', async () => {
  const response = await fetch(`${CatalogServiceUrl}/artists`); // Replace with your API endpoint
  const data = await response.json();
  return data; // Return the fetched data
});

export const artistsSlice = createSlice({
  name: 'artists',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getArtists.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getArtists.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; // Set the fetched artists data to state
      })
      .addCase(getArtists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Store the error message
      });
  },
});

export default artistsSlice.reducer;
