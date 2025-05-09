// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// // Thunk để lấy danh sách đánh giá theo `tourId`
// export const fetchReviewsByTourId = createAsyncThunk(
//   'reviews/fetchReviewsByTourId',
//   async (tourId, { rejectWithValue }) => {
//     try {
//       const response = await fetch(
//         `https://trip-aura-server.vercel.app/review/api/getByTourId`,
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ tourId }),
//         },
//       );
//       const data = await response.json();

//       if (!response.ok) {
//         return rejectWithValue(data);
//       }
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// // Thunk để thêm đánh giá mới
// export const addReview = createAsyncThunk(
//   'reviews/addReview',
//   async (reviewData, { rejectWithValue }) => {
//     try {
//       const response = await fetch(
//         `https://trip-aura-server-git-main-minhnhut2306s-projects.vercel.app/review/api/addReview`,
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(reviewData),
//         },
//       );
//       const data = await response.json();

//       if (!response.ok) {
//         return rejectWithValue(data);
//       }
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// // Khởi tạo state ban đầu
// const initialState = {
//   reviewsData: [], // Dữ liệu danh sách đánh giá
//   reviewsStatus: 'idle', // Trạng thái cho danh sách đánh giá
//   error: null, // Lưu lỗi nếu có
//   addReviewStatus: 'idle', // Trạng thái khi thêm đánh giá
// };

// // Tạo slice
// const reviewSlice = createSlice({
//   name: 'reviews',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // Xử lý lấy danh sách đánh giá
//       .addCase(fetchReviewsByTourId.pending, (state) => {
//         state.reviewsStatus = 'loading';
//         state.error = null;
//       })
//       .addCase(fetchReviewsByTourId.fulfilled, (state, action) => {
//         state.reviewsStatus = 'success';
//         state.reviewsData = action.payload.data;
//       })
//       .addCase(fetchReviewsByTourId.rejected, (state, action) => {
//         state.reviewsStatus = 'failed';
//         state.error = action.payload || action.error.message;
//       })

//       // Xử lý thêm đánh giá
//       .addCase(addReview.pending, (state) => {
//         state.addReviewStatus = 'loading';
//         state.error = null;
//       })
//       .addCase(addReview.fulfilled, (state, action) => {
//         state.addReviewStatus = 'success';
//         state.reviewsData.push(action.payload.data); // Thêm đánh giá mới vào danh sách
//       })
//       .addCase(addReview.rejected, (state, action) => {
//         state.addReviewStatus = 'failed';
//         state.error = action.payload || action.error.message;
//       });
//   },
// });

// export default reviewSlice.reducer;
