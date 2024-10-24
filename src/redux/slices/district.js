// slices/district.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Tạo hàm fetchDistricts
export const fetchDistricts = createAsyncThunk(
    'districts/fetchDistricts',
    async () => {
        const response = await fetch(`https://provinces.open-api.vn/api/d/`);
        if (!response.ok) {
            throw new Error('Failed to fetch districts');
        }
        return await response.json();
    }
);

const districtSlice = createSlice({
    name: 'districts',
    initialState: {
        districts: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDistricts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchDistricts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.districts = action.payload;
            })
            .addCase(fetchDistricts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default districtSlice.reducer; // Đảm bảo bạn đã xuất khẩu reducer
