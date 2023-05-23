import { configureStore } from '@reduxjs/toolkit';
import profileSlice from './features/profile/profileSlice';
import pagesSlice from './features/pages/pagesSlice';

const store = configureStore({
    reducer: {
        profile: profileSlice,
        pages: pagesSlice
    }
});

export default store