import React, { useContext } from 'react';
import { Route } from 'react-router-dom';
import Signup from '../pages/Signup';
import { UserContext } from '../App';

function ProtectedRoute({ children, ...rest }) {
  const userContext = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={() => {
        if (userContext.isAuth) {
          return children;
        } else {
          return <Signup />;
        }
      }}
    />
  );
}

export default ProtectedRoute;
