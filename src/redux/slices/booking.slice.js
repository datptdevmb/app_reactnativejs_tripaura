import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchBookingById = createAsyncThunk(
    'booking/fetchBookingById',
    async (bookingId, { rejectWithValue }) => {
        try {
            const response = await fetch(`https://trip-aura-server.vercel.app/booking/api/getbookingId/${bookingId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch booking by ID');
            }
            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchBookingsByUserId = createAsyncThunk(
    'booking/fetchBookingsByUserId',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await fetch(`https://trip-aura-server.vercel.app/booking/api/bookinguser/${userId}`);
            console.log('response', response);
            
            if (!response.ok) {
                throw new Error('Failed to fetch bookings for user');
            }
            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchBooking = createAsyncThunk('booking/fetchBooking', async (data) => {
    const response = await fetch('https://trip-aura-server.vercel.app/booking/api/addToCart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Failed');
    }
    return await response.json();
});

const initialState = {
    bookings: [],
    bookingData: null,
    loading: false,
    err: null,
};

const bookingSlice = createSlice({
    name: 'bookings',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchBookingById.fulfilled, (state, action) => {
            state.bookingData = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchBookingById.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchBookingById.rejected, (state, action) => {
            state.loading = false;
            state.err = action.error.message;
        });

        builder.addCase(fetchBookingsByUserId.fulfilled, (state, action) => {
            state.bookings = action.payload.data;
            state.loading = false;
        });
        builder.addCase(fetchBookingsByUserId.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchBookingsByUserId.rejected, (state, action) => {
            state.loading = false;
            state.err = action.error.message;
        });


        builder.addCase(fetchBooking.fulfilled, (state, action) => {
            state.bookings = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchBooking.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchBooking.rejected, (state, action) => {
            state.loading = false;
            state.err = action.error.message;
        });
    },
});

export default bookingSlice.reducer;
