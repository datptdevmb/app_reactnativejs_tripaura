import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import Category from "../../sevices/category.sevice"
import Schedule from "../../screens/main/stacks/schedule/schedule";
import axios from "axios";



export const createSchedules = createAsyncThunk(
    'shedules/create', async ({ name = 'abc', departure, destination, endDay, person, startDay,userId }) => {
        if (!departure || !destination || !startDay || !endDay || person < 1) {
            console.log('Thông báo', 'Vui lòng nhập đầy đủ thông tin.');
            console.log(departure);

            return;
        }

        try {
            const response = await axios.post('https://trip-aura-server.vercel.app/lichTrinh/api/add', {
                name,
                departure,
                destination,
                endDay,
                person,
                startDay,
                userId
            }
            );


            if (response.status === 200) {a
                console.log("respone", response.data.data)
                return await response.data.data

            } else {
                console.log('Lỗi', response.data.message || 'Không thể lên lịch trình.');
            }
        } catch (error) {
            console.error('Lỗi khi gọi API:', error);

        }
    }
)

const initialState = {
    Schedules: [],
    loading: false,
    err: null
}

const categorySlice = createSlice({
    name: 'Schedules',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createSchedules.fulfilled, (state, action) => {
            state.Schedules = action.payload
            state.loading = false
        })
        builder.addCase(createSchedules.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(createSchedules.rejected, (state, action) => {
            state.loading = false
            console.log('Đăng nhập thất bại:', action.error.message);
            state.err = action.error.message;
        })
    }
})

export default categorySlice.reducer
