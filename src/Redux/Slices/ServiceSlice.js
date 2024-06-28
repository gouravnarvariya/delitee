import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../Apis/Api";
import { toast } from "react-toastify";
import { act } from "react";


const initialState = {
    ServiceList: { pending: false, data: null, error: null, message: "" },
    IsServiceAdd: { pending: false, data: null, error: null, message: "" },
    IsServiceDelete: { pending: false, data: null, error: null, message: "" },
    IsServiceEdit: { pending: false, data: null, error: null, message: "" },

};

export const GetAllService = createAsyncThunk('service-list', async (_, { rejectWithValue }) => {
    try {
        const response = await Api.get('service');
        console.log("response" , response.services)
        return response.services;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const AddService = createAsyncThunk("add-service", async (body, { rejectWithValue }) => {
    try {
        const response = await Api.post('service', body);
        // if (!response.status) {

        // }
        return { data: response.service_details };

    } catch (error) {
        const { data } = error.response;
        return {
            error: {
                type: "server",
                message: data?.error || "Something went wrongsss",
            },
        };
    }
});

export const DeleteService = createAsyncThunk("delete-service", async (param, { rejectWithValue }) => {
    try {
        const url = `service/${param}`;
        const response = await Api.delete(url);
        return response;
    } catch (error) {
        const { response } = error;
        const { data } = response || {};
        return rejectWithValue({
            type: "server",
            message: data?.message || "Something went wrong",
        });
    }
});
export const EditService = createAsyncThunk("edit-service", async (body, { rejectWithValue }) => {
    try {
        const url = `service/${body.serviceId}`;
        const response = await Api.put(url, body.form);
        return { data: response.service_details };
    } catch (error) {
        const { data } = error.response;
        return {
            error: {
                type: "server",
                message: data?.error || "Something went wrong",
            },
        };
    }
});

const ServiceSlice = createSlice({
    name: "ServiceSlice",
    initialState,
    reducers: {
        clearIsServiceAdd: (state) => {
            state.IsServiceAdd = { pending: false, data: null, error: null, message: "" };
        },
        clearIsServiceDelete: (state) => {
            state.IsServiceDelete = { pending: false, data: null, error: null, message: "" };
        },
        clearIsServiceEdit: (state) => {
            state.IsServiceEdit = { pending: false, data: null, error: null, message: "" };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetAllService.pending, (state) => {
                state.ServiceList.pending = true;
                state.ServiceList.error = null;
                state.ServiceList.message = '';
            })
            .addCase(GetAllService.fulfilled, (state, action) => {
                state.ServiceList.pending = false;
                state.ServiceList.data = action.payload;
                state.ServiceList.message = null;
            })
            .addCase(GetAllService.rejected, (state, action) => {
                state.ServiceList.pending = false;
                state.ServiceList.error = action.payload;
                state.ServiceList.message = 'Failed to fetch services';
            })
            .addCase(AddService.pending, (state) => {
                state.IsServiceAdd.pending = true;
                state.IsServiceAdd.error = null;
                state.IsServiceAdd.message = '';
            })
            .addCase(AddService.fulfilled, (state, action) => {
                state.IsServiceAdd.pending = false;
                if (action.payload.data) {
                    state.IsServiceAdd.data = action.payload.data;
                } else {

                    state.IsServiceAdd.error = action.payload.error;
                }
                state.IsServiceAdd.message = 'Service added successfully';
            })
            .addCase(AddService.rejected, (state, action) => {
                state.IsServiceAdd.pending = false;
                state.IsServiceAdd.error = action.payload;
                state.IsServiceAdd.message = 'Failed to add service';
            })
            .addCase(DeleteService.pending, (state) => {
                state.IsServiceDelete.pending = true;
                state.IsServiceDelete.error = null;
                state.IsServiceDelete.message = '';
            })
            .addCase(DeleteService.fulfilled, (state, action) => {
                state.IsServiceDelete.pending = false;
                state.IsServiceDelete.data = action.payload;
                state.IsServiceDelete.message = 'Service deleted successfully';
            })
            .addCase(DeleteService.rejected, (state, action) => {
                state.IsServiceDelete.pending = false;
                state.IsServiceDelete.error = action.payload;
                state.IsServiceDelete.message = 'Failed to delete service';
            })
            .addCase(EditService.pending, (state) => {
                state.IsServiceEdit.pending = true;
                state.IsServiceEdit.error = null;
                state.IsServiceEdit.message = '';
            })
            .addCase(EditService.fulfilled, (state, action) => {
                state.IsServiceEdit.pending = false;
                if (action.payload.data) {
                    state.IsServiceEdit.data = action.payload.data;
                } else {
                    state.IsServiceEdit.error = action.payload.error;
                }
                state.IsServiceEdit.message = 'Service deleted successfully';
            })
            .addCase(EditService.rejected, (state, action) => {
                state.IsServiceEdit.pending = false;
                state.IsServiceEdit.error = action.payload;
                state.IsServiceEdit.message = 'Failed to delete service';
            });
    }
});

export const { clearIsServiceAdd, clearIsServiceDelete, clearIsServiceEdit } = ServiceSlice.actions;
export default ServiceSlice.reducer;
