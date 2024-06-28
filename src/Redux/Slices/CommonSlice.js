import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../Apis/Api";

const initialState = {
    GetToggle: {
        pending: false,
        success: false,
        error: null
    }
}

export const ToggleEvery = createAsyncThunk('status', async (data, { rejectWithValue }) => {
    console.log("data:" , data)
    try {
        const response = await Api.put('/common/change-status', data);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

const CommonSlice = createSlice({
    name: "CommonSlice",
    initialState,
    reducers: {
        ClearToggle : (state, action)=> {
            state.GetToggle.pending = false
            state.GetToggle.success = false
            state.GetToggle.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(ToggleEvery.pending, (state) => {
                state.GetToggle.pending = true;
                state.GetToggle.success = false;
                state.GetToggle.error = null;
            })
            .addCase(ToggleEvery.fulfilled, (state, action) => {
                state.GetToggle.pending = false;
                state.GetToggle.success = true;
                state.GetToggle.error = null;
            })
            .addCase(ToggleEvery.rejected, (state, action) => {
                state.GetToggle.pending = false;
                state.GetToggle.success = false;
                state.GetToggle.error = action.payload;
            });
    }
})


export const {ClearToggle} = CommonSlice.actions
export default CommonSlice.reducer