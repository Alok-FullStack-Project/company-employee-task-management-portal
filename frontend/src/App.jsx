import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import AddEmployeePage from './pages/AddEmployeePage.jsx';
import AddTaskPage from './pages/AddTaskPage.jsx';
import EmployeeDashboardPage from './pages/EmployeeDashboardPage.jsx';
import AddUserPage from './pages/AddUserPage.jsx';
import UserListPage from './pages/UserListPage.jsx';
import EmployeeListPage from './pages/EmployeeListPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Layout from './components/Layout.jsx';
import TaskListPage from './pages/TaskListPage.jsx';
import EmployeeProfilePage from './pages/EmployeeProfilePage.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <>
      <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes wrapped with Layout */}
        <Route
          path="/"
          element={
            <ProtectedRoute roleAllowed={['admin', 'manager', 'employee']}>
              <Layout>
                <DashboardPage /> {/* default dashboard */}
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute roleAllowed={['admin', 'manager']}>
              <Layout>
                <DashboardPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-user"
          element={
            <ProtectedRoute roleAllowed={['admin']}>
              <Layout>
                <AddUserPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-list"
          element={
            <ProtectedRoute roleAllowed={['admin']}>
              <Layout>
                <UserListPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-employee"
          element={
            <ProtectedRoute roleAllowed={['admin', 'manager']}>
              <Layout>
                <AddEmployeePage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee-list"
          element={
            <ProtectedRoute roleAllowed={['admin', 'manager']}>
              <Layout>
                <EmployeeListPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-task"
          element={
            <ProtectedRoute roleAllowed={['admin', 'manager']}>
              <Layout>
                <AddTaskPage />
              </Layout>
            </ProtectedRoute>
          }
        />
          <Route
          path="/task-list"
          element={
            <ProtectedRoute roleAllowed={['admin', 'manager']}>
              <Layout>
                <TaskListPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee-dashboard"
          element={
            <ProtectedRoute roleAllowed={['employee']}>
              <Layout>
                <EmployeeDashboardPage />
              </Layout>
            </ProtectedRoute>
          }
        />
     
      <Route
          path="/profile"
          element={
            <ProtectedRoute roleAllowed={['employee']}>
              <Layout>
                <EmployeeProfilePage />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
 <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </>
    
  );
}

export default App;
