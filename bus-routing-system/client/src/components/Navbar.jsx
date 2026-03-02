import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-sm border-b border-slate-200">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="text-lg font-bold text-brand">Smart Bus</Link>
        <div className="flex items-center gap-4 text-sm">
          <Link to="/admin" className="hover:text-brand">Admin</Link>
          <Link to="/driver" className="hover:text-brand">Driver</Link>
          <Link to="/passenger" className="hover:text-brand">Passenger</Link>
          {user ? (
            <button className="rounded bg-brand px-3 py-1.5 text-white" onClick={handleLogout}>Logout</button>
          ) : (
            <Link to="/login" className="rounded bg-brand px-3 py-1.5 text-white">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
