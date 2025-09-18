import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice.js';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="bg-blue-600 text-white flex justify-between items-center p-4">
      <h1 className="text-lg font-semibold">Welcome, {user?.name}</h1>
      <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded">
        Logout
      </button>
    </header>
  );
}
