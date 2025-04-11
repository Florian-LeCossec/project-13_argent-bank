import { Navigate, Outlet } from 'react-router';
import { getToken } from '../features/auth/authService';

function ProtectedRoute() {
  const token = getToken();
  return token ? <Outlet /> : <Navigate to="/login" replace />;
}
export default ProtectedRoute;