import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProvinces = createAsyncThunk(
  'provinces/fetchProvinces',
  async () => {
    const response = await fetch('https://provinces.open-api.vn/api/');
    if (!response.ok) {
      throw new Error('Failed to fetch provinces');
    }
    return await response.json();
  }
);

const provincesSlice = createSlice({
  name: 'provinces',
  initialState: {
    provinces: [],
    loading: false,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProvinces.pending, (state) => {
        state.loading = true;
        state.status = 'loading';
      })
      .addCase(fetchProvinces.fulfilled, (state, action) => {
        state.loading = false;
        state.status = 'succeeded';
        state.provinces = action.payload;
      })
      .addCase(fetchProvinces.rejected, (state, action) => {
        state.loading = false;
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default provincesSlice.reducer;
