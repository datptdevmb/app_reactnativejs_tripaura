import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const themXoaYeuThichTour = createAsyncThunk(
  'favorites/toggleFavorite',
  async ({ userId, tourId }) => {
    try {
      const response = await fetch(
        'https://trip-aura-server.vercel.app/favourite/api/add',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId, tourId }),
        },
      );

      const data = await response.json();
      return data
    } catch (error) {
      return rejectWithValue('Có lỗi xảy ra');
    }
  }
);


export const LayDanhSachYeuThich = createAsyncThunk(
  'favorites/getFavorites',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://trip-aura-server.vercel.app/favourite/api/getFavouriteByUser?userId=${userId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await response.json();
      if (data.status === 'success') {

        return data.data;
      } else {
        return rejectWithValue('Không thể lấy danh sách yêu thích');
      }
    } catch (error) {
      return rejectWithValue('Có lỗi xảy ra');
    }
  }
);

// Thunk để kiểm tra trạng thái yêu thích của một tour cụ thể
export const KiemTraYeuThich = createAsyncThunk(
  'favorites/checkFavorite',
  async ({ userId, tourId }) => {
    try {
      const response = await fetch(
        `https://trip-aura-server.vercel.app/favourite/api/checkFavourite?userId=${userId}&tourId=${tourId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      return error
    }
  }
);

const initialState = {
  favoritesData: [],
  favoritesStatus: 'idle',
  isTourFavorited: false,
  error: null,
  message: '',
};

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(themXoaYeuThichTour.pending, (state) => {
        state.favoritesStatus = 'loading';
      })
      .addCase(themXoaYeuThichTour.fulfilled, (state, action) => {

        const data = action.payload
        state.favoritesStatus = 'success';
        if (data.msg == "Đã xóa khỏi mục yêu thích") {
          state.message = "Đã xóa khỏi mục yêu thích"
          state.isTourFavorited = false;
          const tourId = data.data.detailTours[0]._id;
          state.favoritesData = state.favoritesData.filter(item => item.id !== tourId);

        }
        if (data.msg == "Thêm vào mục yêu thích thành công") {
          state.isTourFavorited = true;
          state.message = "Đã thêm vào mục yêu thích"
          state.favoritesData = [...state.favoritesData,
          {
            id: data.data?.detailTours[0]._id,
            image: data.data?.detailTours[0].images.linkImage[0] || 'https://tse4.mm.bing.net/th?id=OIP.1zq4a7G007iHUBybiLxrTwAAAA&pid=Api&P=0&h=220',
            tourName: data.data?.detailTours[0].tourName || 'Khám Phá trải nghiệm tham quan Phố cổ Hội An',
            price: data.data?.detailTours[0].details[0].priceAdult || 100000,
            locate: data.data?.detailTours[0].locations.destination || 'Nghệ An'
          }
          ]

        }
      })
      .addCase(themXoaYeuThichTour.rejected, (state, action) => {
        state.favoritesStatus = 'failed';
        state.error = action.payload || action.error.message;
      })

      .addCase(LayDanhSachYeuThich.pending, (state) => {
        state.favoritesStatus = 'loading';
      })
      .addCase(LayDanhSachYeuThich.fulfilled, (state, action) => {
        state.favoritesStatus = 'success';
        console.log(action.payload)

        state.favoritesData = action.payload.map(item => (
          {
            id: item.tourId,
            image: item?.images[0] || 'https://tse4.mm.bing.net/th?id=OIP.1zq4a7G007iHUBybiLxrTwAAAA&pid=Api&P=0&h=220',
            tourName: item?.tourName || 'Khám Phá trải nghiệm tham quan Phố cổ Hội An',
            price: item?.details?.priceAdult || 100000,
            locate: item?.locations?.destination || 'Nghệ An'
          }
        ));
      })
      .addCase(LayDanhSachYeuThich.rejected, (state, action) => {
        state.favoritesStatus = 'failed';
        state.error = action.payload || action.error.message;
      })


      .addCase(KiemTraYeuThich.pending, (state) => {
        state.favoritesStatus = 'loading';
      })
      .addCase(KiemTraYeuThich.fulfilled, (state, action) => {
        state.favoritesStatus = 'success';
        console.log(action.payload.data)
        state.isTourFavorited = action.payload.data;
      })
      .addCase(KiemTraYeuThich.rejected, (state, action) => {
        state.favoritesStatus = 'failed';
        state.error = action.payload || action.error.message;
      });
  },
});

export default favoriteSlice.reducer;
