import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    apartments: []
};

export const getAllApartments = createAsyncThunk(
    'apartments/getAllApartments',
    async (name, thunkAPI) => {
        try {
        // console.log(name);
        // console.log(thunkAPI);
        // console.log(thunkAPI.getState());
        // thunkAPI.dispatch(openModal());
        const resp = await axios('/api/apartments');
        console.log(resp.data)
        return resp.data;
        } catch (error) {
            return thunkAPI.rejectWithValue('something went wrong');
        }
    }
);

const apartmentsSlice = createSlice({
    name: "apartments",
    initialState,
    reducers: {
        // logout: (state, action) => {
        //     state.profile = null;
        // }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getAllApartments.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getAllApartments.fulfilled, (state, action) => {
            // console.log(action);
            state.isLoading = false;
            state.apartments = action.payload.data;
        })
        .addCase(getAllApartments.rejected, (state, action) => {
            state.isLoading = false;
        });
    }
});

// export const {logout} = apartmentsSlice.actions;


export default apartmentsSlice.reducer;