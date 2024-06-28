import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../Apis/Api";
import { setToken, setUserId } from "../../utils/tokenHandler";

const initialState = {
    UserAuthLogin: { pending: false, data: null, error: null, message: "" },
};
export const AuthLogin = createAsyncThunk("log/in", async (formData) => {
    console.log(formData)
    try {
        const response = await Api.post("/auth/login", formData);
        const { accessToken, message } = response
        console.log(response)
        setToken(accessToken)
        const data = { accessToken }
        return { data, message }
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

const Authentication = createSlice({
    name: "Authentication",
    initialState,
    reducers: {
        clearUserAuthLogin: (state) => {
            state.UserAuthLogin = { pending: false, data: null, error: null }
        },

        setCustomerObject: (state, action) => {
            state.UserAuthLogin.data = {
                ...state.UserAuthLogin.data,
                ...action.payload
            }
        },
        logout: (state) => {
            state.UserAuthLogin = { pending: false, data: null, error: null }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(AuthLogin.pending, (state, action) => {
                state.UserAuthLogin.pending = true;
            })
            .addCase(AuthLogin.fulfilled, (state, action) => {
                state.UserAuthLogin.pending = false;
                if (action.payload.data) {
                    state.UserAuthLogin.data = action.payload.data;
                    state.UserAuthLogin.message = action.payload.message;
                } else {
                    state.UserAuthLogin.error = action.payload.error;
                }
            })
            .addCase(AuthLogin.rejected, (state, action) => {
                state.UserAuthLogin.pending = false;
                if (action?.payload?.error) {
                    state.UserAuthLogin.error = action?.payload?.error;
                } else {
                    state.UserAuthLogin.error = {
                        type: "server",
                        message: "Internal server Error",
                    }
                }
            })


    },
});


export const { clearUserAuthLogin, setCustomerObject, logout } = Authentication.actions;
export default Authentication.reducer;

