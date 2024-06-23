import { configureStore } from '@reduxjs/toolkit';
import { api } from '../components/utils/api';
import authReducer from './userSlice';

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store