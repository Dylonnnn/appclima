import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from '../features/weatherSlice';
import authReducer from '../features/authSlice';
import favoritesReducer from '../features/favoritesSlice';

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    auth: authReducer,
    favorites: favoritesReducer,
  },
});