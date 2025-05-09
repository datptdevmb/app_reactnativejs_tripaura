import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Tạo hàm ThayDoiThongTin để thực hiện gọi API cập nhật thông tin người dùng
export const ThayDoiThongTin = createAsyncThunk(
    'changeUser/ThayDoiThongTin',
    async (data, { rejectWithValue }) => {
        try {
            const response = await fetch(
                'https://trip-aura-server-git-main-minhnhut2306s-projects.vercel.app/auth/api/updateUser',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                }
            );

            const user = await response.json();

            if (!response.ok) {
                return rejectWithValue(user.message || 'Failed');
            }

            console.log("============== changeUser =========", user);
            return user;
        } catch (error) {
            return rejectWithValue(error.message || 'Network Error');
        }
    }
);

const changeUserSlice = createSlice({
    name: 'changeUser',
    initialState: {
        user: null,
        changeUserData: null,
        changeUserStatus: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(ThayDoiThongTin.pending, (state) => {
                state.changeUserStatus = 'loading';
                state.error = null;
            })
            .addCase(ThayDoiThongTin.fulfilled, (state, action) => {
                console.log("Fulfilled action:", action);
                state.changeUserStatus = 'succeeded';
                state.user = action.payload;
            })
            .addCase(ThayDoiThongTin.rejected, (state, action) => {
                state.changeUserStatus = 'failed';
                state.error = action.payload || action.error.message;
                console.log("Error message:", action.error.message);
            });
    },
});

export default changeUserSlice.reducer;
