
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance.js';

export const addTask = createAsyncThunk(
  'tasks/addTask',
  async (taskData, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post('/tasks/add', taskData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'Failed to add task');
    }
  }
);


// Get tasks assigned to employee
export const getTasks = createAsyncThunk(
  'tasks/getTasks',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get('/tasks');
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'Failed to fetch tasks');
    }
  }
);

export const getEmployeeTasks = createAsyncThunk(
  'tasks/getEmployeeTasks',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get('/tasks/my-tasks');
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch employee tasks');
    }
  }
);

// Update task status
export const updateTaskStatus = createAsyncThunk(
  'tasks/updateTaskStatus',
  async ({ taskId, status }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(`/tasks/${taskId}/update-status`, { status });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'Failed to update task status');
    }
  }
);

// Update task status
export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ taskId, formData }, { rejectWithValue }) => {
    try {
      console.log(formData);
      const { data } = await axiosInstance.put(`/tasks/${taskId}/update-task`,  formData );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'Failed to update task status');
    }
  }
);

const taskSlice = createSlice({
  name: 'tasks',
  initialState: { tasks: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addTask.pending, (state) => { state.loading = true; })
      .addCase(addTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload);
      })
      .addCase(addTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getTasks.pending, (state) => { state.loading = true; })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateTaskStatus.pending, (state) => { state.loading = true; })
      .addCase(updateTaskStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.tasks.findIndex(task => task._id === action.payload._id);
        if (index !== -1) state.tasks[index] = action.payload;
      })
      .addCase(updateTaskStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getEmployeeTasks.pending, (state) => { state.loading = true; })
      .addCase(getEmployeeTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(getEmployeeTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateTask.pending, (state) => { state.loading = true; })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.tasks.findIndex(task => task._id === action.payload._id);
        if (index !== -1) state.tasks[index] = action.payload;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default taskSlice.reducer;
