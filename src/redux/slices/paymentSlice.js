import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const createPayment = createAsyncThunk('payment/createPaymentLink', async (paymentData) => {
    console.log('Requesting payment creation...');
    const response = await fetch('https://trip-aura-server.vercel.app/payment/create-payment-link', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
    });

    console.log('API response status:', response.status);  // Kiểm tra status trả về
    const responseData = await response.json();
    console.log('API response data:', responseData);  // Log dữ liệu trả về từ server

    if (!response.ok) {
        console.error('Failed to create payment link:', responseData.message || 'Unknown error');
        throw new Error(responseData.message || 'Failed to create payment');
    }

    if (!responseData.paymentLink) {
        console.error('No payment link provided');
        throw new Error('Payment link not provided');
    }

    return responseData;
});



const paymentSlice = createSlice({
    name: 'payment',
    initialState: {
        paymentInfo: null,
        status: 'idle',
        error: null,
    },
    reducers: {
        clearPaymentData: (state) => {
            state.paymentInfo = null;
            state.status = 'idle';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createPayment.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createPayment.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.paymentInfo = action.payload;
            })
            .addCase(createPayment.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
    
});

export const { clearPaymentData } = paymentSlice.actions;

export default paymentSlice.reducer;
