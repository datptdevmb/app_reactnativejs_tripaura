import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const ThayDoiThongTin = createAsyncThunk('changeUser', async data => {
    const response = await fetch(
        'https://trip-aura-server-git-main-minhnhut2306s-projects.vercel.app/auth/api/updateUser',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        },
    );
    const user = await response.json();
    if (response.ok) {
        console.log("============== changeUser =========", user);
        return user;
    }
    console.error('Update user failed:', user); // Log the error response
    throw new Error(user.message || 'Failed'); // Provide a more descriptive error
});


export const changeUserSlice = createSlice({
    name: 'changeUser',
    initialState: {
        changeUserData: {},
        changeUserStatus: 'idle',
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(ThayDoiThongTin.pending, (state, action) => {
                state.changeUserStatus = 'loading';
            })
            .addCase(ThayDoiThongTin.fulfilled, (state, action) => {
                state.changeUserStatus = 'successed';
                state.changeUserData = action.payload;
            })
            .addCase(ThayDoiThongTin.rejected, (state, action) => {
                state.changeUserStatus = 'failed';
                console.log(action.error.message);
            });
    },
});

export default changeUserSlice.reducer;
