import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

//tạo hàm DangKyTaiKhoan để thực hiện chức năng gọi API đăng ký tài khoản
export const GetDiaDiemByTinh = createAsyncThunk('diaDiemByTinh', async tinhId => {
    // console.log("======= ssssssssssssssssssss", lichTrinhId, dayId);

    const response = await fetch(
        `https://trip-aura-server-git-main-minhnhut2306s-projects.vercel.app/diaDiem/api/getByTinh?tinhId=${tinhId}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        },
    );
    console.log('response:', response);


    const diaDiemByTinh = await response.json();
    // console.log('API Response:', diaDiemByTinh); // Log phản hồi từ API

    if (response.ok) {
        return diaDiemByTinh;
    }
    // console.error('API Error:', response.statusText); // Log lỗi nếu phản hồi không thành công
    throw new Error('Failed');
});


//tạo Slice quản lý trạng thái khi gọi hàm DangKyTaiKhoan
export const lichTrinhByUserSlice = createSlice({
    name: 'diaDiemByTinh',
    initialState: {
        diaDiemByTinhData: {},
        diaDiemByTinhStatus: 'idle',
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(GetDiaDiemByTinh.pending, (state, action) => {
                state.diaDiemByTinhStatus = 'loading';
            })
            .addCase(GetDiaDiemByTinh.fulfilled, (state, action) => {
                state.diaDiemByTinhStatus = 'successed';
                // state.changeUserData = action.payload;
                state.diaDiemByTinhData = action.payload;
            })
            .addCase(GetDiaDiemByTinh.rejected, (state, action) => {
                state.diaDiemByTinhStatus = 'failed';
                console.log(action.error.message);
            });
    },
});

export default lichTrinhByUserSlice.reducer;
