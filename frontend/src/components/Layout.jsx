import Sidebar from './Sidebar.jsx';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function Layout({ children }) {
  const { user, token } = useSelector((state) => state.auth);

  if (!token || !user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar userRole={user.role} />

      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-4 flex-1">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
