import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CatalogServiceUrl } from '../../Functions';

// Asynchronous thunk to fetch albums
export const getAlbums = createAsyncThunk('catalog/getAlbums', async () => {
  const response = await fetch(`${CatalogServiceUrl}/albums`); // Replace with your API endpoint
  const data = await response.json();
  return data; // Return the fetched data
});

export const getAlbum = createAsyncThunk('catalog/getAlbum', async (id) => {
  const response = await fetch(`${CatalogServiceUrl}/albums/${id}`); // Replace with your API endpoint
  const data = await response.json();
  return data; // Return the fetched data
});

export const albumsSlice = createSlice({
  name: 'albums',
  initialState: {
    data: [],
    album: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAlbums.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAlbums.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; // Set the fetched artists data to state
      })
      .addCase(getAlbums.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Store the error message
      })
      
      .addCase(getAlbum.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAlbum.fulfilled, (state, action) => {
        state.loading = false;
        state.album = action.payload; // Set the fetched artists data to state
      })
      .addCase(getAlbum.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Store the error message
      });
  },
});

export default albumsSlice.reducer;
