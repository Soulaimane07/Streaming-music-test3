import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CatalogServiceUrl } from '../../Functions';

// Asynchronous thunk to fetch artists
export const getArtists = createAsyncThunk('catalog/getArtists', async () => {
  const response = await fetch(`${CatalogServiceUrl}/artists`); // Replace with your API endpoint
  const data = await response.json();
  return data; // Return the fetched data
});

export const getArtist = createAsyncThunk('catalog/getArtist', async (id) => {
  const response = await fetch(`${CatalogServiceUrl}/artists/${id}`); // Replace with your API endpoint
  const data = await response.json();
  return data; // Return the fetched data
});

export const artistsSlice = createSlice({
  name: 'artists',
  initialState: {
    data: [],
    artist: null,
    loadingArtists: false,
    loadingArtist: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getArtists.pending, (state) => {
        state.loadingArtists = true;
        state.error = null;
      })
      .addCase(getArtists.fulfilled, (state, action) => {
        state.loadingArtists = false;
        state.data = action.payload; // Set the fetched artists data to state
      })
      .addCase(getArtists.rejected, (state, action) => {
        state.loadingArtists = false;
        state.error = action.error.message; // Store the error message
      })
      
      .addCase(getArtist.pending, (state) => {
        state.loadingArtist = true;
        state.error = null;
      })
      .addCase(getArtist.fulfilled, (state, action) => {
        state.loadingArtist = false;
        state.artist = action.payload; // Set the fetched artists data to state
      })
      .addCase(getArtist.rejected, (state, action) => {
        state.loadingArtist = false;
        state.error = action.error.message; // Store the error message
      });
  },
});

export default artistsSlice.reducer;
