import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const ProtectedRoute = (): React.ReactElement => {
  const { isAuthenticated } = useAuthContext();
  const location = useLocation();

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate
      to="/auth"
      state={{ from: location, error: "Please log in to access this page." }}
      replace
    />
  );
};

export default ProtectedRoute;
