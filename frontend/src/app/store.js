import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice.js';
import userReducer from '../features/user/userSlice.js';
import employeeReducer from '../features/employee/employeeSlice.js';
import taskReducer from '../features/task/taskSlice.js';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    employee: employeeReducer,
    tasks: taskReducer,
  },
});

export default store;
