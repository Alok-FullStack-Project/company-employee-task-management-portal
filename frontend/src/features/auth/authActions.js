import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance.js';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password, role }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post('/auth/login', { email, password, role });
      return data; // { token, role }
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'Login failed');
    }
  }
);
