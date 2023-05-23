import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    profile: null
};

export const getProfile = createAsyncThunk(
    'profile/getProfile',
    async (name, thunkAPI) => {
        try {
        // console.log(name);
        // console.log(thunkAPI);
        // console.log(thunkAPI.getState());
        // thunkAPI.dispatch(openModal());
        const resp = await axios('/api/isLogedIn');

        return resp.data;
        } catch (error) {
            return thunkAPI.rejectWithValue('something went wrong');
        }
    }
);

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        logout: (state, action) => {
            state.profile = null;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getProfile.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getProfile.fulfilled, (state, action) => {
            // console.log(action);
            state.isLoading = false;
            state.profile = action.payload;
        })
        .addCase(getProfile.rejected, (state, action) => {
            console.log(action);
            state.isLoading = false;
        });
    }
});

export const {logout} = profileSlice.actions;


export default profileSlice.reducer;