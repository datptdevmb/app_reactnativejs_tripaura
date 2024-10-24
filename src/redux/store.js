
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import tourReducer from './slices/tour.slice';
import categoryReducer from './slices/category.slice';
import favoriteReducer from './slices/favouriteducers';
import favoriteAdDeleteReducer from './slices/favouriteAddDeleteducers';
import favouriteDeleteReducer from './slices/favouriteDeleteDucers';
import loginReducer from './slices/loginreducers';
import changeUserReducer from './slices/ChangeUserSlice';
import registerReducer from './slices/registerreducers';
import provincesReducer from './slices/cityprovince';
import districtReducer from './slices/district';
import authReducur from './slices/auth.slice';
import imagesReducer from './slices/image.slice';


const rootReducer = combineReducers({
  auth: authReducur,
  images:imagesReducer,
  tour: tourReducer,
  category: categoryReducer,
  favorites: favoriteReducer,
  favoriteAdDelete: favoriteAdDeleteReducer,
  favouriteDelete: favouriteDeleteReducer,
  login: loginReducer,
  changeUser: changeUserReducer,
  register: registerReducer,
  provinces: provincesReducer,
  district: districtReducer,

});

// Configure the store

const store = configureStore({

  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),

  reducer: {
    reducer: rootReducer,
  },

});


export default store;