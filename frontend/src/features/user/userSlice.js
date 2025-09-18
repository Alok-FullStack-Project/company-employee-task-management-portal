import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance.js';

// Add User
export const addUser = createAsyncThunk(
  'user/addUser',
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post('/users/add', userData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'Failed to add user');
    }
  }
);

// Get User List
export const getUsers = createAsyncThunk(
  'user/getUsers',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get('/users');
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'Failed to load users');
    }
  }
);

// Update user action
export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/users/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'Failed to update user');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: { users: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addUser.pending, (state) => { state.loading = true; })
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getUsers.pending, (state) => { state.loading = true; })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateUser.pending, (state) => { state.loading = true; })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
       // state.users = action.payload;
       const index = state.users.findIndex(u => u._id === action.payload._id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });   
  },
});

export default userSlice.reducer;
