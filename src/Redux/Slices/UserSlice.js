import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../Apis/Api";
import { toast } from "react-toastify";

const initialState = {
    ProfileInfo: { pending: false, data: null, error: null, message: "" },
    UserInfo: { pending: false, data: null, error: null, message: "" },
    UsersList: { pending: false, data: null, error: null, message: "" },
    WorkerList: { pending: false, data: null, error: null, message: "" },
    IsUserDeleted: { pending: false, data: null, error: null, message: "" },
    UpdateUser: { pending: false, data: null, error: null, message: ""  },
    PasswordChanged: { pending: false, data: null, error: null, message: ""  },
    EmployeeSignUp: { pending: false, data: null, error: null ,message: "" },


}

export const GetAllUsers = createAsyncThunk('user-list', async (params) => {
    try {
        const url = `user/all?role=USER`
        const response = await Api.get(url)
        const { user_details } = response
        return { user_details }
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

export const GetAllWorkers = createAsyncThunk('worker-list', async (params) => {
    try {
        const url = `user/all?role=EMPLOYEE`
        const response = await Api.get(url)
        const { user_details } = response
        return { user_details }
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

export const GetProfileDetails = createAsyncThunk('profile-details', async () => {
    try {
        const url = `user/`
        const response = await Api.get(url)
        const { user_details } = response
        return { user_details }
    } catch (error) {
        throw error
    }
})

export const DeleteUser = createAsyncThunk('user/delete', async (id) => {
    try {
        const response = await Api.delete(`user/${id}`);
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
})

export const GetUserDetails = createAsyncThunk('user-details', async (userId) => {
    try {
        const url = `user/?userId=${userId}`
        const response = await Api.get(url)
        const { user_details } = response
        return { user_details }
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

export const UpdateUsers = createAsyncThunk('UpdateUsers', async ({forms }) => {
    console.log(forms)
    try {
        const url = `/user`
        const response = await Api.put(url , forms) 
        // if(response.message === 'Profile updated successfully') {
        //     toast.success("Profile updated successfully")
        // }else {
        //     toast.error("Something went wrong")
        // }
        return response.message === 'Profile updated successfully' ? { data: response } : { error: response }
    } catch (error) {
        return error;
    }
})

export const AddWorker = createAsyncThunk(
    "add worker/sign-up",
    async (props) => {
        const body = {...props , 
            password:12345,
            role:"EMPLOYEE"
        }
      try {
        const response = await Api.post("/auth/sign-up", body);
        const { data, status,accessToken, message } = response
        console.log("response:" , response)
        return response
        // if (status) {
        //   setToken(data.web_response.token)
        //   return { data }
        // } else {
        //   return {
        //     error: { type: "server", message, },
        //   }
        // }
      } catch (error) {
        const { status, data } = error.response;
        return {
          error: {
            type: "server",
            message: "Something went wrong",
          },
        };
      }
    }
  );

export const ChangePassword = createAsyncThunk(
    "/auth/change-password",
    async (body) => {
      try {
        const response = await Api.post("auth/change-password", body);
        const { data, status, message } = response
        console.log(response)
        if (message==="password changed successfully") { return { message } } else {
          return {
            error: { type: "server", message, },
          }
        }
      } catch (error) {
        console.log(error)
        const { status, data } = error.response;
        return {
          error: {
            type: "server",
            message: data?.error ||"Something went wrong",
          },
        };
      }
    }
  );




const UserSlice = createSlice({
    name: "UserSlice",
    initialState,
    reducers: {
        clearIsUserDeleted: (state) => {
            state.IsUserDeleted = { pending: false, data: null, error: null, message: "" }
        },
        clearUpdateUser: (state, action) => {
            state.UpdateUser = { pending: false, data: null, error: null, message: "" }
        },
        clearPasswordChanged: (state) => {
            state.PasswordChanged =  { pending: false, data: null, error: null, message: "" }
          },
        clearEmployeeAddUser: (state) => {
            state.EmployeeSignUp =  { pending: false, data: null, error: null, message: "" }
        }
    },
    extraReducers: (builder) => {
        builder

            .addCase(GetProfileDetails.pending, (state) => {
                state.ProfileInfo.pending = true;
                state.ProfileInfo.error = null;
                state.ProfileInfo.message = '';
            })
            .addCase(GetProfileDetails.fulfilled, (state, action) => {
                state.ProfileInfo.pending = false;
                state.ProfileInfo.data = action.payload?.user_details;
                state.ProfileInfo.message = null;
            })
            .addCase(GetProfileDetails.rejected, (state, action) => {
                state.ProfileInfo.pending = false;
                state.ProfileInfo.error = action.payload;
                state.ProfileInfo.message = 'Failed to fetch bookings';
            })

            .addCase(GetAllUsers.pending, (state) => {
                state.UsersList.pending = true;
                state.UsersList.error = null;
                state.UsersList.message = '';
            })
            .addCase(GetAllUsers.fulfilled, (state, action) => {
                state.UsersList.pending = false;
                if (action.payload?.user_details) {
                    state.UsersList.data = action.payload?.user_details;
                } else {
                    state.UsersList.error = action.payload?.error;
                }
                state.UsersList.message = null;
            })
            .addCase(GetAllUsers.rejected, (state, action) => {
                state.UsersList.pending = false;
                state.UsersList.error = action.payload;
                state.UsersList.message = 'Failed to fetch bookings';
            })


            .addCase(GetAllWorkers.pending, (state) => {
                state.WorkerList.pending = true;
                state.WorkerList.error = null;
                state.WorkerList.message = '';
            })
            .addCase(GetAllWorkers.fulfilled, (state, action) => {
                state.WorkerList.pending = false;
                if (action.payload?.user_details) {
                    state.WorkerList.data = action.payload?.user_details;
                } else {
                    state.WorkerList.error = action.payload?.error;
                }
                state.WorkerList.message = null;
            })
            .addCase(GetAllWorkers.rejected, (state, action) => {
                state.WorkerList.pending = false;
                state.WorkerList.error = action.payload;
                state.WorkerList.message = 'Failed to fetch bookings';
            })





            .addCase(DeleteUser.pending, (state) => {
                state.IsUserDeleted.pending = true;
                state.IsUserDeleted.error = null;
                state.IsUserDeleted.message = '';
            })
            .addCase(DeleteUser.fulfilled, (state, action) => {
                state.IsUserDeleted.pending = false;
                if (action.payload.data) {
                    state.IsUserDeleted.data = action.payload.data;
                } else {
                    state.IsUserDeleted.error = action.payload.error;
                }
                state.IsUserDeleted.message = null;
            })
            .addCase(DeleteUser.rejected, (state, action) => {
                state.IsUserDeleted.pending = false;
                state.IsUserDeleted.error = action.payload;
                state.IsUserDeleted.message = 'Failed to fetch bookings';
            })



            .addCase(GetUserDetails.pending, (state) => {
                state.UserInfo.pending = true;
                state.UserInfo.error = null;
                state.UserInfo.message = '';
            })
            .addCase(GetUserDetails.fulfilled, (state, action) => {
                state.UserInfo.pending = false;
                state.UserInfo.data = action.payload?.user_details;
                state.UserInfo.message = null;
            })
            .addCase(GetUserDetails.rejected, (state, action) => {
                state.UserInfo.pending = false;
                state.UserInfo.error = action.payload;
                state.UserInfo.message = 'Failed to fetch bookings';
            })


            .addCase(UpdateUsers.pending, (state) => {
                state.UpdateUser.pending = true;
                state.UpdateUser.error = null;
                state.UpdateUser.message = '';
            })
            .addCase(UpdateUsers.fulfilled, (state, action) => {
                state.UpdateUser.pending = false;
                if(action.payload?.user_details) {
                    state.UpdateUser.data = action.payload?.data?.user_details;
                }  else {
                    state.UpdateUser.data = action.payload;
                } 
                // console.log(action.payload.data)
                state.UpdateUser.message = action.payload?.data?.message;
            })
            .addCase(UpdateUsers.rejected, (state, action) => {
                state.UpdateUser.pending = false;
                state.UpdateUser.error = action.payload;
                state.UpdateUser.message = 'Failed to update user';
            })


            .addCase(ChangePassword.pending, (state) => {
                state.PasswordChanged.pending = true;
                state.PasswordChanged.error = null;
                state.PasswordChanged.message = '';
            })
            .addCase(ChangePassword.fulfilled, (state, action) => {
                console.log(action.payload)
                if(action.payload.message) {
                    state.PasswordChanged.data = action.payload;
                    state.PasswordChanged.message = action.payload
                } else {
                    state.PasswordChanged.error = action.payload.error.message;
                }
            })
            .addCase(ChangePassword.rejected, (state, action) => {
                state.PasswordChanged.pending = false;
                state.PasswordChanged.error = action.payload;
                state.PasswordChanged.message = 'Failed to update user';
            })




            .addCase(AddWorker.pending, (state) => {
                state.EmployeeSignUp.pending = true;
                state.EmployeeSignUp.error = null;
                state.EmployeeSignUp.message = '';
            })
            .addCase(AddWorker.fulfilled, (state, action) => {
               
                if(action.payload.accessToken) {
                    state.EmployeeSignUp.data = action.payload;
                    state.EmployeeSignUp.message = action.payload.message
                } else {
                    state.EmployeeSignUp.error = action.payload.error.message;
                }
            })
            .addCase(AddWorker.rejected, (state, action) => {
                state.EmployeeSignUp.pending = false;
                state.EmployeeSignUp.error = action.payload;
                state.EmployeeSignUp.message = 'Failed to update user';
            })

    }
})

export const { clearIsUserDeleted , clearUpdateUse , clearPasswordChanged ,clearEmployeeAddUser } = UserSlice.actions;
export default UserSlice.reducer