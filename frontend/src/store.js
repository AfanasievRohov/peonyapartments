import { configureStore } from '@reduxjs/toolkit';
import profileSlice from './features/profile/profileSlice';
import apartmentsSlice from './features/apartments/apartmentsSlice';
import dashboardMenuSlice from './features/dashboard-menu/dashboardMenuSlice';
import customersSlice from './features/customers/customersSlice';

const store = configureStore({
    reducer: {
        profile: profileSlice,
        apartments: apartmentsSlice,
        menu: dashboardMenuSlice,
        customers: customersSlice
    }
});

export default store