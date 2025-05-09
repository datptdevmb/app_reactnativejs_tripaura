import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchReviewsByTourId = createAsyncThunk(
  'reviews/fetchReviewsByTourId',
  async (tourId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://trip-aura-server.vercel.app/review/api/getByTourId`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ tourId }),
        },
      );
      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data);
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const addReview = createAsyncThunk(
  'reviews/addReview',
  async (reviewData, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://trip-aura-server-git-main-minhnhut2306s-projects.vercel.app/review/api/addReview`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(reviewData),
        },
      );
      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data);
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getreviewbytouridandbyuserid = createAsyncThunk(
  'reviews/getreviewbytouridandbyuserid',
  async ({ userId, tourId }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://trip-aura-server-git-main-minhnhut2306s-projects.vercel.app/review/getreviewbytouridandbyuserid?userId=${userId}&tourId=${tourId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.text(); 
        return rejectWithValue(errorData);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching review:", error);
      return rejectWithValue(error.message);
    }
  }
);


const initialState = {
  reviewsData: [],
  reviewsStatus: 'idle',
  error: null,
  addReviewStatus: 'idle',
  getReviewByUserAndTourStatus: 'idle',
  getReviewByUserAndTourData: [],
};


const reviewSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchReviewsByTourId.pending, (state) => {
        state.reviewsStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchReviewsByTourId.fulfilled, (state, action) => {
        state.reviewsStatus = 'success';
        state.reviewsData = action.payload.data;
      })
      .addCase(fetchReviewsByTourId.rejected, (state, action) => {
        state.reviewsStatus = 'failed';
        state.error = action.payload || action.error.message;
      })

      .addCase(addReview.pending, (state) => {
        state.addReviewStatus = 'loading';
        state.error = null;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.addReviewStatus = 'success';
        state.reviewsData.push(action.payload.data);
      })
      .addCase(addReview.rejected, (state, action) => {
        state.addReviewStatus = 'failed';
        state.error = action.payload || action.error.message;
      })

      .addCase(getreviewbytouridandbyuserid.fulfilled, (state, action) => {
        const { userId, tourId } = action.meta.arg;
        state.getReviewByUserAndTourStatus = 'succeeded';
        state.getReviewByUserAndTourData = {
          ...state.getReviewByUserAndTourData,
          [tourId]: action.payload, 
        };
      })
      .addCase(getreviewbytouridandbyuserid.pending, (state) => {
        state.getReviewByUserAndTourStatus = 'loading';
      })
      .addCase(getreviewbytouridandbyuserid.rejected, (state, action) => {
        state.getReviewByUserAndTourStatus = 'failed';
        state.getReviewByUserAndTourData = action.payload;
      });

  },
});

export default reviewSlice.reducer;
