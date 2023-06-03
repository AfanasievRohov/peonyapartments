import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    customers: [],
    isUpdatedField: false
};

export const getAllCustomers = createAsyncThunk(
    'customers/getAllCustomers',
    async (name, thunkAPI) => {
        try {
        // console.log(name);
        // console.log(thunkAPI);
        // console.log(thunkAPI.getState());
        // thunkAPI.dispatch(openModal());
        const resp = await axios('/api/customers');
        console.log(resp.data)
        return resp.data;
        } catch (error) {
            return thunkAPI.rejectWithValue('something went wrong');
        }
    }
);

export const updateCustomerNote = createAsyncThunk(
    'customers/updateCustomerNote',
    async (data, thunkAPI) => {
        try {
        // console.log(name);
        // console.log(thunkAPI);
        // console.log(thunkAPI.getState());
        // thunkAPI.dispatch(openModal());
        const resp = await axios.patch('/api/customers', data);
        console.log(resp.data)
        return resp.data;
        } catch (error) {
            return thunkAPI.rejectWithValue('something went wrong');
        }
    }
);

export const deleteCustomerNote = createAsyncThunk(
    'customers/deleteCustomerNote',
    async (data, thunkAPI) => {
        try {
        // console.log(name);
        // console.log(thunkAPI);
        // console.log(thunkAPI.getState());
        // thunkAPI.dispatch(openModal());
        const resp = await axios.delete('/api/customers', {data: {_id: data}});
        console.log(resp.data)
        return resp.data;
        } catch (error) {
            return thunkAPI.rejectWithValue('something went wrong');
        }
    }
);

const customersSlice = createSlice({
    name: "customers",
    initialState,
    reducers: {
        resetUpdatedField: (state, action) => {
            state.isUpdatedField = false;
        }
        // logout: (state, action) => {
        //     state.profile = null;
        // }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getAllCustomers.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getAllCustomers.fulfilled, (state, action) => {
            // console.log(action);
            state.isLoading = false;
            state.customers = action.payload.data;
        })
        .addCase(getAllCustomers.rejected, (state, action) => {
            state.isLoading = false;
        })
        .addCase(updateCustomerNote.pending, (state, action) => {
            state.isUpdating = true;
        })
        .addCase(updateCustomerNote.fulfilled, (state, action) => {
            console.log(action)
            state.isUpdatedField = true;
            state.isUpdating = false;
        })
        .addCase(updateCustomerNote.rejected, (state, action) => {
            state.isUpdating = false;
        })
        .addCase(deleteCustomerNote.pending, (state, action) => {
            state.isPending = true;
        })
        .addCase(deleteCustomerNote.fulfilled, (state, action) => {
            console.log(action.meta.arg)
            state.customers = state.customers.filter(elem => elem._id != action.meta.arg)
            state.isPending = false;
        })
        .addCase(deleteCustomerNote.rejected, (state, action) => {
            state.isPending = false;
        })
    }
});

export const {resetUpdatedField} = customersSlice.actions;


export default customersSlice.reducer;