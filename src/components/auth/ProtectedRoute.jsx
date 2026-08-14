import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import LoadingSpinner from '../shared/LoadingSpinner';
import { ROUTES, ROLE_DEFAULT_ROUTE } from '../../constants/routes';

export default function ProtectedRoute({ allowedRoles = [] }) {
  const { user, role, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner label="Se verifică accesul..." />;
  }

  if (!user) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  const currentRole = role || ROLES.STUDENT;

  if (allowedRoles.length > 0 && !allowedRoles.includes(currentRole)) {
    const destination = ROLE_DEFAULT_ROUTE[currentRole] || ROUTES.HOME;
    return <Navigate to={destination} replace />;
  }

  return <Outlet />;
}
