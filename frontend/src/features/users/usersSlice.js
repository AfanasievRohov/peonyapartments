import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    users: []
};

export const getAllUsers = createAsyncThunk(
    'users/getAllUsers',
    async (name, thunkAPI) => {
        try {
        // console.log(name);
        // console.log(thunkAPI);
        // console.log(thunkAPI.getState());
        // thunkAPI.dispatch(openModal());
        const resp = await axios('/api/administration/signupPhoneNumbers');
        console.log(resp.data)
        return resp.data;
        } catch (error) {
            return thunkAPI.rejectWithValue('something went wrong');
        }
    }
);

export const deleteUser = createAsyncThunk(
    'users/deleteUser',
    async (data, thunkAPI) => {
        try {
        // console.log(name);
        // console.log(thunkAPI);
        // console.log(thunkAPI.getState());
        // thunkAPI.dispatch(openModal());
        const resp = await axios.delete('/api/administration/signupPhoneNumbers', {data: {_id: data}});
        console.log(resp.data)
        return resp.data;
        } catch (error) {
            return thunkAPI.rejectWithValue('something went wrong');
        }
    }
);

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        // logout: (state, action) => {
        //     state.profile = null;
        // }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getAllUsers.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getAllUsers.fulfilled, (state, action) => {
            // console.log(action);
            state.isLoading = false;
            state.users = action.payload.data;
        })
        .addCase(getAllUsers.rejected, (state, action) => {
            state.isLoading = false;
        })
        .addCase(deleteUser.pending, (state, action) => {
            state.isPending = true;
        })
        .addCase(deleteUser.fulfilled, (state, action) => {
            console.log(action.meta.arg)
            state.users = state.users.filter(elem => elem._id != action.meta.arg)
            state.isPending = false;
        })
        .addCase(deleteUser.rejected, (state, action) => {
            state.isPending = false;
        })
    }
});

// export const {logot} = usersSlice.actions;


export default usersSlice.reducer;