import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import moviesReducer from './features/movies/moviesSlice';
import themeReducer from './features/theme/themeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    movies: moviesReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;