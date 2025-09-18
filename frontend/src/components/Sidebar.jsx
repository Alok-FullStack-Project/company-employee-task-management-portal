import { Link } from 'react-router-dom';
import { Users, UserPlus, List, LayoutDashboard, ClipboardList, User, UserCheck } from 'lucide-react';

export default function Sidebar({ userRole }) {
  return (
    <aside className="w-64 bg-blue-700 text-white min-h-screen p-6">
      <div className="text-3xl font-bold mb-8">Task Manager</div>

      <nav className="flex flex-col space-y-4">
        {userRole === 'admin' && (
          <>
            <Link to="/dashboard" className="flex items-center space-x-2 hover:bg-blue-600 p-2 rounded">
              <LayoutDashboard size={20} /> <span>Dashboard</span>
            </Link>

            <Link to="/add-user" className="flex items-center space-x-2 hover:bg-blue-600 p-2 rounded">
              <UserPlus size={20} /> <span>Add User</span>
            </Link>

            <Link to="/user-list" className="flex items-center space-x-2 hover:bg-blue-600 p-2 rounded">
              <Users size={20} /> <span>User List</span>
            </Link>

            <Link to="/employee-list" className="flex items-center space-x-2 hover:bg-blue-600 p-2 rounded">
              <UserCheck size={20} /> <span>Employee List</span>
            </Link>

            <Link to="/task-list" className="flex items-center space-x-2 hover:bg-blue-600 p-2 rounded">
              <ClipboardList size={20} /> <span>Task List</span>
            </Link>
          </>
        )}

        {userRole === 'manager' && (
          <>
            <Link to="/dashboard" className="flex items-center space-x-2 hover:bg-blue-600 p-2 rounded">
              <LayoutDashboard size={20} /> <span>Dashboard</span>
            </Link>

            <Link to="/add-employee" className="flex items-center space-x-2 hover:bg-blue-600 p-2 rounded">
              <UserPlus size={20} /> <span>Add Employee</span>
            </Link>

            <Link to="/employee-list" className="flex items-center space-x-2 hover:bg-blue-600 p-2 rounded">
              <UserCheck size={20} /> <span>Employee List</span>
            </Link>

            <Link to="/add-task" className="flex items-center space-x-2 hover:bg-blue-600 p-2 rounded">
              <ClipboardList size={20} /> <span>Add Task</span>
            </Link>

            <Link to="/task-list" className="flex items-center space-x-2 hover:bg-blue-600 p-2 rounded">
              <ClipboardList size={20} /> <span>Task List</span>
            </Link>
          </>
        )}

        {userRole === 'employee' && (
          <>
            <Link to="/employee-dashboard" className="flex items-center space-x-2 hover:bg-blue-600 p-2 rounded">
              <ClipboardList size={20} /> <span>My Tasks</span>
            </Link>

            <Link to="/profile" className="flex items-center space-x-2 hover:bg-blue-600 p-2 rounded">
              <User size={20} /> <span>Profile</span>
            </Link>
          </>
        )}
      </nav>
    </aside>
  );
}
