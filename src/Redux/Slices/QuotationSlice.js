import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../Apis/Api";

const initialState = {
    QuotationList: { pending: false, data: null, error: null, message: "" },
    WorkerBookingsList: { pending: false, data: null, error: null, message: "" },
    UserBookingsList: { pending: false, data: null, error: null, message: "" },
    IsBookingAssigned: { pending: false, data: null, error: null, message: "" },
    IsBookingDeleted: { pending: false, data: null, error: null, message: "" },
    BookingInfo: { pending: false, data: null, error: null, message: "" }
}
export const AssignBooking = createAsyncThunk('bookings/assign', async (body) => {
    try {
        const response = await Api.post(`booking/assign-booking`, body);
        const { assignedBooking } = response
        return { data: assignedBooking };
    } catch (error) {
        const { data } = error.response;
        return {
            error: {
                type: "server",
                message: data?.error || "Something went wrong",
            },
        };
    }
}
);

export const DeleteBooking = createAsyncThunk('bookings/delete', async (id) => {
    try {
        const response = await Api.delete(`booking/${id}`);
        const { data } = response
        return { data };
    } catch (error) {
        const { data } = error.response;
        return {
            error: {
                type: "server",
                message: data?.error || "Something went wrong",
            },
        };
    }
}
)

export const fetchBookings = createAsyncThunk('bookings/fetchBookings', async (params) => {
    try {
        const type = params?.type ? `type=${params.type}` : ''
        const url = `?${type}`
        const response = await Api.get(`/booking${url}`,);
        const { bookings } = response
        return { bookings };
    } catch (error) {
        throw error
    }
}
);

export const WorkerBookings = createAsyncThunk('bookings/worker', async (params) => {
    try {
        const type = params?.type ? `type=${params.type}` : ''
        const workerId = params?.workerId ? `user_id=${params.workerId}` : ''
        const url = `?${type}${workerId}`
        const response = await Api.get(`/employee${url}`,);
        const { assignedBookings } = response
        return { assignedBookings };
    } catch (error) {
        const { data } = error.response;
        return {
            error: {
                type: "server",
                message: data?.error || "Something went wrong",
            },
        };
    }
}
);

export const UserBookings = createAsyncThunk('bookings/of/user', async (params) => {
    try {
        const type = params?.type ? `type=${params.type}` : ''
        const userId = params?.userId ? `user_id=${params.userId}` : ''
        const url = `?${type}${userId}`
        const response = await Api.get(`/booking${url}`,);
        const { bookings } = response
        return { bookings };
    } catch (error) {
        const { data } = error.response;
        return {
            error: {
                type: "server",
                message: data?.error || "Something went wrong",
            },
        };
    }
}
);

export const GetBookingsDetails = createAsyncThunk('bookings/details/', async (id) => {
    try {
        const response = await Api.get(`/booking/${id}`,);
        return { data: response };
    } catch (error) {
        const { data } = error.response;
        return {
            error: {
                type: "server",
                message: data?.error || "Something went wrong",
            },
        };
    }
}
);

const QuotationSlice = createSlice({
    name: "QuotationSlice",
    initialState,
    reducers: {
        clearIsBookingAssigned: (state) => {
            state.IsBookingAssigned = { pending: false, data: null, error: null, message: "" }
        },
        clearIsBookingDeleted: (state) => {
            state.IsBookingDeleted = { pending: false, data: null, error: null, message: "" }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBookings.pending, (state) => {
                state.QuotationList.pending = true;
                state.QuotationList.error = null;
                state.QuotationList.message = '';
            })
            .addCase(fetchBookings.fulfilled, (state, action) => {
                state.QuotationList.pending = false;
                state.QuotationList.data = action.payload;
                state.QuotationList.message = null;
            })
            .addCase(fetchBookings.rejected, (state, action) => {
                state.QuotationList.pending = false;
                state.QuotationList.error = action.payload;
                state.QuotationList.message = 'Failed to fetch bookings';
            })


            .addCase(WorkerBookings.pending, (state) => {
                state.WorkerBookingsList.pending = true;
                state.WorkerBookingsList.error = null;
                state.WorkerBookingsList.message = '';
            })
            .addCase(WorkerBookings.fulfilled, (state, action) => {
                state.WorkerBookingsList.pending = false;
                if (action.payload.assignedBookings) {
                    state.WorkerBookingsList.data = action.payload;
                } else {
                    state.WorkerBookingsList.error = action.payload.error;
                }
                state.WorkerBookingsList.message = null;
            })
            .addCase(WorkerBookings.rejected, (state, action) => {
                state.WorkerBookingsList.pending = false;
                state.WorkerBookingsList.error = action.payload;
                state.WorkerBookingsList.message = 'Failed to fetch bookings';
            })



            .addCase(UserBookings.pending, (state) => {
                state.UserBookingsList.pending = true;
                state.UserBookingsList.error = null;
                state.UserBookingsList.message = '';
            })
            .addCase(UserBookings.fulfilled, (state, action) => {
                state.UserBookingsList.pending = false;
                if (action.payload.bookings) {
                    state.UserBookingsList.data = action.payload;
                } else {
                    state.UserBookingsList.error = action.payload.error;
                }
                state.UserBookingsList.message = null;
            })
            .addCase(UserBookings.rejected, (state, action) => {
                state.UserBookingsList.pending = false;
                state.UserBookingsList.error = action.payload;
                state.UserBookingsList.message = 'Failed to fetch bookings';
            })

            .addCase(AssignBooking.pending, (state) => {
                state.IsBookingAssigned.pending = true;
                state.IsBookingAssigned.error = null;
                state.IsBookingAssigned.message = '';
            })
            .addCase(AssignBooking.fulfilled, (state, action) => {
                state.IsBookingAssigned.pending = false;
                if (action.payload.data) {
                    state.IsBookingAssigned.data = action.payload.data;
                } else {
                    state.IsBookingAssigned.error = action.payload.error;
                }
                state.IsBookingAssigned.message = null;
            })
            .addCase(AssignBooking.rejected, (state, action) => {
                state.IsBookingAssigned.pending = false;
                state.IsBookingAssigned.error = action.payload;
                state.IsBookingAssigned.message = 'Failed to fetch bookings';
            })



            .addCase(DeleteBooking.pending, (state) => {
                state.IsBookingDeleted.pending = true;
                state.IsBookingDeleted.error = null;
                state.IsBookingDeleted.message = '';
            })
            .addCase(DeleteBooking.fulfilled, (state, action) => {
                state.IsBookingDeleted.pending = false;
                if (action.payload.data) {
                    state.IsBookingDeleted.data = action.payload.data;
                } else {
                    state.IsBookingDeleted.error = action.payload.error;
                }
                state.IsBookingDeleted.message = null;
            })
            .addCase(DeleteBooking.rejected, (state, action) => {
                state.IsBookingDeleted.pending = false;
                state.IsBookingDeleted.error = action.payload;
                state.IsBookingDeleted.message = 'Failed to fetch bookings';
            })




            .addCase(GetBookingsDetails.pending, (state) => {
                state.BookingInfo.pending = true;
                state.BookingInfo.error = null;
                state.BookingInfo.message = '';
            })
            .addCase(GetBookingsDetails.fulfilled, (state, action) => {
                state.BookingInfo.pending = false;
                if (action.payload.data) {
                    state.BookingInfo.data = action.payload.data;
                } else {
                    state.BookingInfo.error = action.payload.error;
                }
                state.BookingInfo.message = null;
            })
            .addCase(GetBookingsDetails.rejected, (state, action) => {
                state.BookingInfo.pending = false;
                state.BookingInfo.error = action.payload;
                state.BookingInfo.message = 'Failed to fetch bookings';
            });

    }

})

export const { clearIsBookingAssigned, clearIsBookingDeleted } = QuotationSlice.actions;
export default QuotationSlice.reducer