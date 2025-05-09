import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const LayDanhSachLichTrinh = createAsyncThunk('getVoucher', async (lichTrinhId) => {
    console.log('User ID:', lichTrinhId);
    const response = await fetch(
        `https://trip-aura-server-git-main-minhnhut2306s-projects.vercel.app/lichTrinh/api/getByLichTrinhId?lichTrinhId=${lichTrinhId}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        },
    );
    console.log('response:', response);


    const lichtrinh = await response.json();
    console.log('API Response:', lichtrinh);

    if (response.ok) {
        return lichtrinh;
    }
    console.error('API Error:', response.statusText);
    throw new Error('Failed');
});


export const getLichTrinhSlice = createSlice({
    name: 'lichtrinh',
    initialState: {
        getLichTrinhData: {},
        getLichTrinhStatus: 'idle',
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(LayDanhSachLichTrinh.pending, (state, action) => {
                state.getLichTrinhStatus = 'loading';
            })
            .addCase(LayDanhSachLichTrinh.fulfilled, (state, action) => {
                state.getLichTrinhStatus = 'successed';
                // state.changeUserData = action.payload;
                state.getLichTrinhData = action.payload;
            })
            .addCase(LayDanhSachLichTrinh.rejected, (state, action) => {
                state.getLichTrinhStatus = 'failed';
                console.log(action.error.message);
            });
    },
});

export default getLichTrinhSlice.reducer;
