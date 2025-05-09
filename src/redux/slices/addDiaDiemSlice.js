import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

//tạo hàm DangKyTaiKhoan để thực hiện chức năng gọi API đăng ký tài khoản
export const AddDiaDiem = createAsyncThunk('addDiaDiem', async data => {
    console.log("==============data==============",data);

    const response = await fetch(
        `https://trip-aura-server-git-main-minhnhut2306s-projects.vercel.app/lichTrinh/api/addDiaDiem`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        },
    );
    const diaDiem = await response.json();
    if (response.ok) {
        // console.log("=======================", tours);
        return diaDiem;
    }
    throw new Error('Failed');
});

//tạo Slice quản lý trạng thái khi gọi hàm DangKyTaiKhoan
export const addDiaDiemSlice = createSlice({
    name: 'addDiaDiem',
    initialState: {
        addDiaDiemData: {},
        addDiaDiemStatus: 'idle',
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(AddDiaDiem.pending, (state, action) => {
                state.addDiaDiemStatus = 'loading';
            })
            .addCase(AddDiaDiem.fulfilled, (state, action) => {
                state.addDiaDiemStatus = 'succeeded';
                // state.changeUserData = action.payload;
                state.addDiaDiemData = action.payload;
            })
            .addCase(AddDiaDiem.rejected, (state, action) => {
                state.addDiaDiemStatus = 'failed';
                console.log(action.error.message);
            });
    },
});

export default addDiaDiemSlice.reducer;
