import { Navigate, Outlet } from 'react-router';
import { useAppSelector } from '../hooks/rtkHooks';

function ProtectedRoute() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
export default ProtectedRoute;