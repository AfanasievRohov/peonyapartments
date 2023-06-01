import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    menu: [
        { menuName: 'Apartments',
            img: 'apartments.svg',
            menuPath: '/dashboard'},
        { menuName: 'Customers',
            img: "customers.svg",
            menuPath: '/dashboard-customers'},
        { menuName: 'Map',
            img: 'map.svg',
            menuPath: '/dashboard-map'},
        { menuName: 'Users',
            img: 'users.svg',
            menuPath: '/dashboard-users'},
        { menuName: 'Deleted apartments',
            img: 'deleted.svg',
            menuPath: '/dashboard-deleted-apartments'},
        { menuName: 'Add apartment',
            img: 'addApp.svg',
            menuPath: '/dashboard-add-apatment'},
        { menuName: 'Users list',
            img: 'usersList.svg',
            menuPath: '/dashboard-user-list'}
    ],
    activeMenu: "Apartments"
};

const menuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
        changeMenu: (state, action) => {
            state.activeMenu = action.payload;
        }
    }
});

export const {changeMenu} = menuSlice.actions;


export default menuSlice.reducer;
