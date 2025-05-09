import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

//tạo hàm DangKyTaiKhoan để thực hiện chức năng gọi API đăng ký tài khoản
export const LayLichTrinhTheoUser = createAsyncThunk('lichTrinhByUser', async userId => {
    // console.log("======= ssssssssssssssssssss", lichTrinhId, dayId);

    const response = await fetch(
        `https://trip-aura-server-git-main-minhnhut2306s-projects.vercel.app/lichTrinh/api/getByUserId?userId=${userId}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        },
    );
    console.log('response:', response);


    const lichTrinhByUser = await response.json();
    console.log('API Response:', lichTrinhByUser); // Log phản hồi từ API

    if (response.ok) {
        return lichTrinhByUser;
    }
    console.error('API Error:', response.statusText); // Log lỗi nếu phản hồi không thành công
    throw new Error('Failed');
});


//tạo Slice quản lý trạng thái khi gọi hàm DangKyTaiKhoan
export const lichTrinhByUserSlice = createSlice({
    name: 'lichTrinhByUser',
    initialState: {
        lichTrinhByUserData: {},
        lichTrinhByUserStatus: 'idle',
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(LayLichTrinhTheoUser.pending, (state, action) => {
                state.lichTrinhByUserStatus = 'loading';
            })
            .addCase(LayLichTrinhTheoUser.fulfilled, (state, action) => {
                state.lichTrinhByUserStatus = 'successed';
                // state.changeUserData = action.payload;
                state.lichTrinhByUserData = action.payload;
            })
            .addCase(LayLichTrinhTheoUser.rejected, (state, action) => {
                state.lichTrinhByUserStatus = 'failed';
                console.log(action.error.message);
            });
    },
});

export default lichTrinhByUserSlice.reducer;
