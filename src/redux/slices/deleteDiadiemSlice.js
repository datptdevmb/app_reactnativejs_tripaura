import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

//tạo hàm DangKyTaiKhoan để thực hiện chức năng gọi API đăng ký tài khoản
export const DeleteDiaDiem = createAsyncThunk('deleteDiaDiem', async data => {
    console.log("==============data==============", data);

    const response = await fetch(
        `https://trip-aura-server-git-main-minhnhut2306s-projects.vercel.app/lichTrinh/api/deleteDiaDiem`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        },
    );
    const diadiem = await response.json();
    if (response.ok) {
        console.log("=======================", diadiem);
        return diadiem;
    }
    throw new Error('Failed');
});

//tạo Slice quản lý trạng thái khi gọi hàm DangKyTaiKhoan
export const deleteDiaDiemSlice = createSlice({
    name: 'deleteDiaDiem',
    initialState: {
        deleteDiaDiemData: {},
        deleteDiaDiemStatus: 'idle',
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(DeleteDiaDiem.pending, (state, action) => {
                state.deleteDiaDiemStatus = 'loading';
            })
            .addCase(DeleteDiaDiem.fulfilled, (state, action) => {
                state.deleteDiaDiemStatus = 'succeeded';
                // state.changeUserData = action.payload;
                state.deleteDiaDiemData = action.payload;
            })
            .addCase(DeleteDiaDiem.rejected, (state, action) => {
                state.deleteDiaDiemStatus = 'failed';
                console.log(action.error.message);
            });
    },
});

export default deleteDiaDiemSlice.reducer;
