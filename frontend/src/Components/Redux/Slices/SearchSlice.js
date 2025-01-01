import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Replace this with your actual API base URL
const API_BASE_URL = 'http://localhost:5113/api/Search';

export const fetchSearchResults = createAsyncThunk(
  'catalog/fetchSearchResults',
  async (query, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/search?query=${query}`);
      if (!response.ok) {
        throw new Error('Failed to fetch search results');
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const searchBoxSlice = createSlice({
  name: 'searchBox',
  initialState: {
    searchText: '',
    data: '',
    loading: false,
    error: null,
    openned: false,
  },
  reducers: {
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    open: (state) => {
      state.openned = true;
    },
    close: (state) => {
      state.openned = false;
      state.searchText = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An error occurred.';
      });
  },
});

export const { open, close, setSearchText } = searchBoxSlice.actions;
export default searchBoxSlice.reducer;
