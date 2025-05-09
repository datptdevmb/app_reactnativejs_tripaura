import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

//tạo hàm DangKyTaiKhoan để thực hiện chức năng gọi API đăng ký tài khoản
export const LayDiaDiemTheoNgay = createAsyncThunk('locationByDate', async ({ lichTrinhId, dayId }) => {
    // console.log("======= ssssssssssssssssssss", lichTrinhId, dayId);

    const response = await fetch(
        `https://trip-aura-server-git-main-minhnhut2306s-projects.vercel.app/lichTrinh/api/getByDate?lichTrinhId=${lichTrinhId}&dayId=${dayId}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        },
    );
    console.log('response:', response);


    const locationByDate = await response.json();
    console.log('API Response:', locationByDate); // Log phản hồi từ API

    if (response.ok) {
        return locationByDate;
    }
    console.error('API Error:', response.statusText); // Log lỗi nếu phản hồi không thành công
    throw new Error('Failed');
});


//tạo Slice quản lý trạng thái khi gọi hàm DangKyTaiKhoan
export const locationByDateSlice = createSlice({
    name: 'locationByDate',
    initialState: {
        locationByDateData: {},
        locationByDateStatus: 'idle',
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(LayDiaDiemTheoNgay.pending, (state, action) => {
                state.locationByDateStatus = 'loading';
            })
            .addCase(LayDiaDiemTheoNgay.fulfilled, (state, action) => {
                state.locationByDateStatus = 'successed';
                // state.changeUserData = action.payload;
                state.locationByDateData = action.payload;
            })
            .addCase(LayDiaDiemTheoNgay.rejected, (state, action) => {
                state.locationByDateStatus = 'failed';
                console.log(action.error.message);
            });
    },
});

export default locationByDateSlice.reducer;
