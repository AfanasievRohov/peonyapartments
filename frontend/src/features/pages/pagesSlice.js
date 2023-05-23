import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    page: null
};

const pagesSlice = createSlice({
    name: "page",
    initialState,
    reducers: {
        changePage: (state, action) => {
            state.page = action.payload;
        }
    },
});

export const {changePage} = pagesSlice.actions;


export default pagesSlice.reducer;