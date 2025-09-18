import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance.js';

// Add Employee
export const addEmployee = createAsyncThunk(
  'employee/addEmployee',
  async (employeeData, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post('/employees/add', employeeData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'Failed to add employee');
    }
  }
);

// Get All Employees
export const getEmployees = createAsyncThunk(
  'employee/getEmployees',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get('/employees');
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'Failed to load employees');
    }
  }
);

// Add this new async thunk:
export const updateEmployee = createAsyncThunk(
  'employee/updateEmployee',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const { data: response } = await axiosInstance.put(`/employees/${id}`, data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'Failed to update employee');
    }
  }
);

const employeeSlice = createSlice({
  name: 'employee',
  initialState: {
    employees: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add Employee
      .addCase(addEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employees.push(action.payload);
      })
      .addCase(addEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Employees
      .addCase(getEmployees.pending, (state) => {
        state.loading = true;
      })
      .addCase(getEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(getEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // update Employees
     .addCase(updateEmployee.pending, (state) => { state.loading = true; })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.loading = false;
        // Update the employee in the list
        const index = state.employees.findIndex(emp => emp._id === action.payload._id);
        if (index !== -1) {
          state.employees[index] = action.payload;
        }
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

      
  },
});

export default employeeSlice.reducer;
