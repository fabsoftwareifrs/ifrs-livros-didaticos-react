import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../providers/Auth";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { auth } = useAuth();
  return (
    <Route
      {...rest}
      render={props =>
        auth.isAuthenticated ? (
          <Redirect exact to="/app/books" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
