import { configureStore } from '@reduxjs/toolkit';
import profileSlice from './features/profile/profileSlice';
import apartmentsSlice from './features/apartments/apartmentsSlice';

const store = configureStore({
    reducer: {
        profile: profileSlice,
        apartments: apartmentsSlice
    }
});

export default store