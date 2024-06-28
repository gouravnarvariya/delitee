import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../Apis/Api";

const initialState = {
    CategoryList: { pending: false, data: null, error: null, message: "" },
    IsCategoryAdd: { pending: false, data: null, error: null, message: "" },
    IsCategoryDelete: { pending: false, data: null, error: null, message: "" },
};

export const GetAllCategory = createAsyncThunk('category-list', async (_, { rejectWithValue }) => {
    try {
        const response = await Api.get('categories');
        const { categories } = response
        return { categories };
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const AddCategory = createAsyncThunk("add-category", async (body, { rejectWithValue }) => {
    try {
        const response = await Api.post('categories', body);
        return response;
    } catch (error) {
        const { response } = error;
        const { data } = response || {};
        return rejectWithValue({
            error: {
                type: "server",
                message: data?.message || "Something went wrong",
            },
        });
    }
});

export const DeleteCategory = createAsyncThunk("delete-category", async (param, { rejectWithValue }) => {
    try {
        const url = `categories/${param}`;
        const response = await Api.delete(url);
        return response;
    } catch (error) {
        const { response } = error;
        const { data } = response || {};
        return rejectWithValue({
            error: {
                type: "server",
                message: data?.message || "Something went wrong",
            },
        });
    }
});

const CategorySlice = createSlice({
    name: "CategorySlice",
    initialState,
    reducers: {
        clearIsCategoryAdd: (state) => {
            state.IsCategoryAdd = { pending: false, data: null, error: null }
        },
        clearIsCategoryDelete: (state) => {
            state.IsCategoryDelete = { pending: false, data: null, error: null }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetAllCategory.pending, (state) => {
                state.CategoryList.pending = true;
                state.CategoryList.error = null;
                state.CategoryList.message = '';
            })
            .addCase(GetAllCategory.fulfilled, (state, action) => {
                state.CategoryList.pending = false;
                state.CategoryList.data = action.payload;
                state.CategoryList.message = null;
            })
            .addCase(GetAllCategory.rejected, (state, action) => {
                state.CategoryList.pending = false;
                state.CategoryList.error = action.payload;
                state.CategoryList.message = 'Failed to fetch categories';
            })
            .addCase(AddCategory.pending, (state) => {
                state.IsCategoryAdd.pending = true;
                state.IsCategoryAdd.error = null;
                state.IsCategoryAdd.message = '';
            })
            .addCase(AddCategory.fulfilled, (state, action) => {
                state.IsCategoryAdd.pending = false;
                state.IsCategoryAdd.data = action.payload;
                state.IsCategoryAdd.message = null;
            })
            .addCase(AddCategory.rejected, (state, action) => {
                state.IsCategoryAdd.pending = false;
                state.IsCategoryAdd.error = action.payload?.error?.message || action.error.message;
                state.IsCategoryAdd.message = 'Failed to add category';
            })
            .addCase(DeleteCategory.pending, (state) => {
                state.IsCategoryDelete.pending = true;
                state.IsCategoryDelete.error = null;
                state.IsCategoryDelete.message = '';
            })
            .addCase(DeleteCategory.fulfilled, (state, action) => {
                state.IsCategoryDelete.pending = false;
                state.IsCategoryDelete.data = action.payload;
                state.IsCategoryDelete.message = null;
            })
            .addCase(DeleteCategory.rejected, (state, action) => {
                state.IsCategoryDelete.pending = false;
                state.IsCategoryDelete.error = action.payload?.error?.message || action.error.message;
                state.IsCategoryDelete.message = 'Failed to delete category';
            });
    }
});

export const { clearIsCategoryAdd, clearIsCategoryDelete } = CategorySlice.actions;
export default CategorySlice.reducer;
