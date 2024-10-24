import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ToastAndroid } from 'react-native';

//tạo hàm DangNhapTaiKhoan để thực hiện chức năng gọi API đăng ký tài khoản
export const DangNhapTaiKhoan = createAsyncThunk('auth/login', async data => {
    const response = await fetch(
        'https://trip-aura-server.vercel.app/auth/login',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        },
    );
    if (!response.ok) {
        throw new Error('Failed');
    }
    return await response.json();
});

//tạo Slice quản lý trạng thái khi gọi hàm DangNhapTaiKhoan
export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        loginData: {},
        loginStatus: 'idle',
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(DangNhapTaiKhoan.pending, (state, action) => {
                state.loginStatus = 'loading';
            })
            .addCase(DangNhapTaiKhoan.fulfilled, (state, action) => {
                state.loginStatus = 'succeeded';
                state.loginData = action.payload;
                ToastAndroid.show(action.payload.message, ToastAndroid.SHORT);
            })
            .addCase(DangNhapTaiKhoan.rejected, (state, action) => {
                state.loginStatus = 'failed';
                console.log(action.error.message);
                ToastAndroid.show(action.payload.message, ToastAndroid.SHORT);
            });
    },
});

export default loginSlice.reducer;
