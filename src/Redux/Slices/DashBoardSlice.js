import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../Apis/Api";

const initialState = {
  DashboardData: { pending: false, data: null, error: null, message: "" }
}

export const dashBoardHistory = createAsyncThunk('dashboard', async () => {
  try {
    const response = await Api.get('/dashboard')
    return response.data
  } catch (error) {
    throw error
  }
})

const DashBoardSlice = createSlice({
  name: "DashBoardSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(dashBoardHistory.pending, (state) => {
        state.DashboardData.pending = true;
        state.DashboardData.error = null;
        state.DashboardData.message = "Loading...";
      })
      .addCase(dashBoardHistory.fulfilled, (state, action) => {
        state.DashboardData.pending = false;
        state.DashboardData.data = action.payload;
        state.DashboardData.error = null;
        state.DashboardData.message = "Data fetched successfully";
      })
      .addCase(dashBoardHistory.rejected, (state, action) => {
        state.DashboardData.pending = false;
        state.DashboardData.error = action.error.message;
        state.DashboardData.message = "Failed to fetch data";
      });
  }
})


export default DashBoardSlice.reducer