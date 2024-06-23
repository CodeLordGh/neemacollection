import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = localStorage.getItem('user');

  return (
    <Route
      {...rest}
      element={
        user ? (
          <Component />
        ) : (
          <Navigate to="/auth/login" replace />
        )
      }
    />
  );
};

export default PrivateRoute;