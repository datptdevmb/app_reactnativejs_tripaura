// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// export const fetchDetailUpdate = createAsyncThunk(
//     'detail/detailUpdate', 
//     async ({ detailId, maxTicket }) => {
//         const response = await fetch(
//             `http://192.168.2.64:3000/detail/api/updateTicket/${detailId}`, 
//             {
//                 method: 'PUT',  
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ maxTicket }),  
//             },
//         );

//         const detail = await response.json();

//         if (response.ok) {
//             return detail;  
//         }

//         throw new Error(detail.message || 'Failed to update ticket');
//     }
// );


// export const changeDetailUpdateSlice = createSlice({
//     name: 'detail',
//     initialState: {
//         changDetailUpdateStatus: 'idle',
//         error: null,
//         updatedTicket: null,  
//     },
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchDetailUpdate.pending, (state) => {
//                 state.changDetailUpdateStatus = 'loading';
//                 state.error = null;
//             })
//             .addCase(fetchDetailUpdate.fulfilled, (state, action) => {
//                 state.changDetailUpdateStatus = 'succeeded';
//                 state.updatedTicket = action.payload; 
//             })
//             .addCase(fetchDetailUpdate.rejected, (state, action) => {
//                 state.changDetailUpdateStatus = 'failed';
//                 state.error = action.error.message;
//             });
//     },
// });

// export default changeDetailUpdateSlice.reducer;
