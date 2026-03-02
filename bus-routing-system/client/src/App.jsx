import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminPage from './pages/AdminPage';
import DriverPage from './pages/DriverPage';
import PassengerPage from './pages/PassengerPage';
import NotFoundPage from './pages/NotFoundPage';
import { useAuth } from './context/AuthContext';

const ProtectedRoute = ({ role, children }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) return <Navigate to="/" replace />;
  return children;
};

const App = () => (
  <div className="min-h-screen bg-slate-100">
    <Navbar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/admin"
        element={(
          <ProtectedRoute role="admin">
            <AdminPage />
          </ProtectedRoute>
        )}
      />
      <Route
        path="/driver"
        element={(
          <ProtectedRoute role="driver">
            <DriverPage />
          </ProtectedRoute>
        )}
      />
      <Route
        path="/passenger"
        element={(
          <ProtectedRoute role="passenger">
            <PassengerPage />
          </ProtectedRoute>
        )}
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </div>
);

export default App;
