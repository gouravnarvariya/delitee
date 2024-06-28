import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../Apis/Api";

const initialState = {
    Notify: { pending: false, data: null, error: null, message: "" }
}

export const FetchNotifications = createAsyncThunk('notification', async () => {
    try {
        const response = await Api.get('/notify')
        const { message, notifications } = response
        return { data: notifications }
    } catch (error) {
        const { data } = error.response;
        return {
            error: {
                type: "server",
                message: data?.error || "Something went wrong",
            },
        };
    }
})

const NotificationSlice = createSlice({
    name: 'NotificationSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(FetchNotifications.pending, (state) => {
                state.Notify.pending = true
                state.Notify.success = false
                state.Notify.error = null
            })
            .addCase(FetchNotifications.fulfilled, (state, action) => {
                state.Notify.pending = false
                state.Notify.success = true
                if (action.payload.data) {
                    state.Notify.data = action.payload.data;
                } else {
                    state.Notify.error = action.payload.error;
                }
                state.Notify.error = null
            })
            .addCase(FetchNotifications.rejected, (state, action) => {
                state.Notify.pending = false
                state.Notify.success = false
                state.Notify.error = action.payload
            })
    }
})

export default NotificationSlice.reducer