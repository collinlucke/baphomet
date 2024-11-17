import { ComponentType, useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useError } from '../../contexts';
import { useShowHeading } from '../../contexts';
import { useIsAuthenticated } from '../../hooks/useIsAuthenticated';

type ProtectedRouteTypes = {
  element: ComponentType<any>;
  props?: Record<string, any>;
};
export const ProtectedRoute: React.FC<ProtectedRouteTypes> = ({
  element: Component,
  props
}) => {
  const isAuthenticated = useIsAuthenticated({ protectedRoute: true });
  const location = useLocation();
  const { error } = useError();
  const { setShowHeading } = useShowHeading();
  const baphToken = localStorage.getItem('baphomet-token');
  if (!baphToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  useEffect(() => {
    if (error) {
      setShowHeading(false);
    }
  }, [error]);

  return <>{!isAuthenticated ? <div /> : <Component {...props} />}</>;
};
