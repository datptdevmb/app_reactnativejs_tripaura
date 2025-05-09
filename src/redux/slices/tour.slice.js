import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Tour from '../../sevices/tour/tour.sevice';
import { KiemTraYeuThich } from './favouriteducers';
import { useDispatch } from 'react-redux';

export const fetchTours = createAsyncThunk(
  'tour/fetchToursByCate',
  async cateId => {
    try {
      const tours = await Tour.getTourByCateId(cateId);
      return tours.data;
    } catch (error) {
      throw error;
    }
  },
);

export const fetchTourById = createAsyncThunk(
  'tour/fetchTourById',
  async ({ tourId }) => {
    try {
      // Lấy dữ liệu từ API
      const response = await Tour.getTourById(tourId);

      if (response.status !== 'success') {
        throw new Error(response.msg || 'Error fetching tour data');
      }

      // Giả sử API trả về đúng định dạng
      const tour = response.data[0];
      const { tourName, description, images, locations, details } = tour;

      // Chuẩn bị dữ liệu để trả về
      const imges = images?.linkImage || '';
      const location = locations.destination;
      console.log(location)
      const adultPrice = details[0]?.priceAdult || 0;
      const childPrice = details[0]?.priceChildren || 0;

      return {
        tourName,
        description,
        imges,
        location,
        details,
        adultPrice,
        childPrice,
      };
    } catch (error) {
      console.error('Fetch tour by ID failed:', error);
      throw error;
    }
  }
);

export const fetchPopularTour = createAsyncThunk(
  'tour/fetchPopularTour',
  async () => {
    try {
      const tours = await Tour.getPopularTours();
      return tours;
    } catch (error) {
      console.log(error);
    }
  },
);

const initialState = {
  tours: [],
  popularTours: [],
  tourById: {},
  loading: false,
  err: null,
  adultTickets: 0,
  childTickets: 0,
  adultPrice: 0,
  childPrice: 0,
  totalPrice: 0,
  selectedDate: null
};

const tourSlice = createSlice({
  name: 'tours',
  initialState,
  reducers: {
    setPrices: (state, action) => {
      state.adultPrice = action.payload.adultPrice;
      state.childPrice = action.payload.childPrice;
    },
    increaseAdultTicket: (state) => {
      state.adultTickets += 1;
      state.totalPrice = (state.adultTickets * state.adultPrice) + (state.childTickets * state.childPrice);
    },
    decreaseAdultTicket: (state) => {
      if (state.adultTickets > 0) {
        state.adultTickets -= 1;
        state.totalPrice = (state.adultTickets * state.adultPrice) + (state.childTickets * state.childPrice);
      }
    },
    increaseChildTicket: (state) => {
      state.childTickets += 1;
      state.totalPrice = (state.adultTickets * state.adultPrice) + (state.childTickets * state.childPrice);
    },
    decreaseChildTicket: (state) => {
      if (state.childTickets > 0) {
        state.childTickets -= 1;
        state.totalPrice = (state.adultTickets * state.adultPrice) + (state.childTickets * state.childPrice);
      }
    },
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    clearTourData: (state) => {
      state.adultTickets = 0;
      state.childTickets = 0;
      state.adultPrice = 0;
      state.childPrice = 0;
      state.totalPrice = 0;
      state.selectedDate = null;
      state.loading = false;
      state.err = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTours.pending, (state) => { state.loading = true; })
      .addCase(fetchTours.fulfilled, (state, action) => {
        state.tours = action.payload;
        state.loading = false;
      })
      .addCase(fetchTours.rejected, (state, action) => {
        state.loading = false;
        state.err = action.error.message;
      })
      .addCase(fetchTourById.pending, state => { state.loading = true; })
      .addCase(fetchTourById.fulfilled, (state, action) => {
        const { adultPrice, childPrice } = action.payload;

        state.tourById = action.payload;
        state.adultPrice = adultPrice;
        state.childPrice = childPrice;
        state.loading = false;
      })
      .addCase(fetchTourById.rejected, (state, action) => {
        state.loading = false;
        console.error('Fetch tour by ID failed:', action.error.message);
        state.err = action.error.message;
      })
      .addCase(fetchPopularTour.pending, state => { state.loading = true; })
      .addCase(fetchPopularTour.fulfilled, (state, action) => {
        state.popularTours = action.payload;
        state.loading = false;
      })
      .addCase(fetchPopularTour.rejected, (state, action) => {
        state.loading = false;
        console.error('Fetch popular tours failed:', action.error.message);
        state.err = action.error.message;
      });
  },
});

export const {
  clearTourData,
  setPrices,
  setSelectedDate,
  increaseAdultTicket,
  decreaseAdultTicket,
  increaseChildTicket,
  decreaseChildTicket,
} = tourSlice.actions;

export default tourSlice.reducer;
