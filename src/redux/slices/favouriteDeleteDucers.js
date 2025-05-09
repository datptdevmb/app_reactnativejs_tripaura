import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

// Hàm xóa yêu thích
export const XaoYeuThich = createAsyncThunk(
  'favorites/deleteFavorite',
  async ({userId, tourId}) => {
    const response = await fetch(
      'https://trip-aura-server.vercel.app/favourite/api/deleteFavourite',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({tourId}),
      },
    );

    const data = await response.json();
    console.log('Delete API response:', data);

    // Kiểm tra phản hồi từ server
    if (data.code === 200 && data.status === 'success') {
      return tourId;
    } else {
      console.error('Error deleting favorite:', data);
      throw new Error(data.msg);
    }
  },
);

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState: {
    favoritesData: [],
    deleteData: [],
    deleteStatus: 'idle',
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(XaoYeuThich.pending, state => {
        state.deleteStatus = 'loading';
      })
      .addCase(XaoYeuThich.fulfilled, (state, action) => {
        state.deleteStatus = 'success';
        const deletedTourId = action.payload;

        // Cập nhật danh sách yêu thích, loại bỏ tour đã xóa
        state.favoritesData = state.favoritesData.filter(
          item => item._id !== deletedTourId, // Sử dụng _id để so sánh
        );
      })
      .addCase(XaoYeuThich.rejected, (state, action) => {
        state.deleteStatus = 'failed';
        state.error = action.error.message; // Ghi lại lỗi nếu có
      });
  },
});

// Xuất reducer
export default favoriteSlice.reducer;
