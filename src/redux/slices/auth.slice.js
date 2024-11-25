<<<<<<< HEAD

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { register, googleLogin } from '../../sevices/auth/auth.service';

=======
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {register, googleLogin} from '../../sevices/auth/auth.service'; 
>>>>>>> 8fd71a664d1c1ba1f0c54154897dbaf96aea97d1
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchUser = createAsyncThunk(
  'auth/fetchUser',
  async (userData, thunkApi) => {
    try {
      const response = await register(userData);
      return response;
    } catch (error) {
      throw error;
    }
  },
);

export const fetchGoogleUser = createAsyncThunk(
  'auth/fetchGoogleUser',
  async (googleUserData, thunkApi) => {
    try {
      const response = await googleLogin(googleUserData);
      await AsyncStorage.setItem('userId', JSON.stringify(response));
<<<<<<< HEAD
=======
      console.log('Thông tin người dùng đã được lưu vào AsyncStorage');
>>>>>>> 8fd71a664d1c1ba1f0c54154897dbaf96aea97d1
      return response;
    } catch (error) {
      throw error;
    }
  },
);

export const checkLoginStatus = createAsyncThunk('auth/checkLoginStatus', async () => {
  const userData = await AsyncStorage.getItem('userId');
  if (userData) {
<<<<<<< HEAD

    return { isLogin: true, user: JSON.parse(userData) }; 
  } else {
    return { isLogin: false, user: null };
=======
    return { isLogin: true, user: JSON.parse(userData) }; // Trả về dữ liệu user nếu có
  } else {
    return { isLogin: false, user: null }; 
>>>>>>> 8fd71a664d1c1ba1f0c54154897dbaf96aea97d1
  }
});

const initialState = {
  user: {},
  isLogin: false,
  loading: false,
  err: null,
};

const authenSlice = createSlice({
  name: 'authen',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // Xử lý trạng thái cho đăng ký
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchUser.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.loading = false;
<<<<<<< HEAD
      state.err = action.error.message;
    });

=======
      console.log('Đăng ký thất bại:', action.error.message);
      state.err = action.error.message;
    });

    // Xử lý trạng thái cho đăng nhập bằng Google
>>>>>>> 8fd71a664d1c1ba1f0c54154897dbaf96aea97d1
    builder.addCase(fetchGoogleUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.isLogin = true;
    });
    builder.addCase(fetchGoogleUser.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchGoogleUser.rejected, (state, action) => {
      state.loading = false;
      console.log('Đăng nhập Google thất bại:', action.error.message);
      state.err = action.error.message;
    });

    // Xử lý trạng thái khi kiểm tra đăng nhập
    builder.addCase(checkLoginStatus.fulfilled, (state, action) => {
      state.isLogin = action.payload.isLogin;
      state.user = action.payload.user || {};  // Nếu không có user, đặt thành object rỗng
      state.loading = false;
    });
    builder.addCase(checkLoginStatus.pending, state => {
      state.loading = true;
    });
    builder.addCase(checkLoginStatus.rejected, (state, action) => {
      state.loading = false;
      console.log('Kiểm tra đăng nhập thất bại:', action.error.message);
      state.err = action.error.message;
    });
  },
});

export default authenSlice.reducer;
