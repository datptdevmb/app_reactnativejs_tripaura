import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

//tạo hàm DangKyTaiKhoan để thực hiện chức năng gọi API đăng ký tài khoản
export const LayDanhSachVoucher = createAsyncThunk('getVoucher', async userId => {
    console.log('User ID:', userId);
    const response = await fetch(
        `https://trip-aura-server-git-main-minhnhut2306s-projects.vercel.app/coupon/api/getByUserId?userId=${userId}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        },
    );
    console.log('response:', response);
    

    const vouchers = await response.json();
    console.log('API Response:', vouchers); // Log phản hồi từ API

    if (response.ok) {
        return vouchers;
    }
    console.error('API Error:', response.statusText); // Log lỗi nếu phản hồi không thành công
    throw new Error('Failed');
});


//tạo Slice quản lý trạng thái khi gọi hàm DangKyTaiKhoan
export const getVoucherSlice = createSlice({
    name: 'vouchers',
    initialState: {
        getVoucherData: {},
        getVoucherStatus: 'idle',
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(LayDanhSachVoucher.pending, (state, action) => {
                state.getVoucherStatus = 'loading';
            })
            .addCase(LayDanhSachVoucher.fulfilled, (state, action) => {
                state.getVoucherStatus = 'successed';
                // state.changeUserData = action.payload;
                state.getVoucherData = action.payload;
            })
            .addCase(LayDanhSachVoucher.rejected, (state, action) => {
                state.getVoucherStatus = 'failed';
                console.log(action.error.message);
            });
    },
});

export default getVoucherSlice.reducer;
