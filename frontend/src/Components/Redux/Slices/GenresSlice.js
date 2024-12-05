import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CatalogServiceUrl } from '../../Functions';

// Asynchronous thunk to fetch genres
export const getGenres = createAsyncThunk('catalog/getGenres', async () => {
  const response = await fetch(`${CatalogServiceUrl}/genres`); // Replace with your API endpoint
  const data = await response.json();
  return data; // Return the fetched data
});

export const getGenre = createAsyncThunk('catalog/getGenre', async (id) => {
  const response = await fetch(`${CatalogServiceUrl}/genres/${id}`); // Replace with your API endpoint
  const data = await response.json();
  return data; // Return the fetched data
});

export const genresSlice = createSlice({
  name: 'genres',
  initialState: {
    data: [],
    genre: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGenres.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getGenres.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; // Set the fetched genres data to state
      })
      .addCase(getGenres.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Store the error message
      })
      
      .addCase(getGenre.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getGenre.fulfilled, (state, action) => {
        state.loading = false;
        state.genre = action.payload; // Set the fetched genres data to state
      })
      .addCase(getGenre.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Store the error message
      });
  },
});

export default genresSlice.reducer;
