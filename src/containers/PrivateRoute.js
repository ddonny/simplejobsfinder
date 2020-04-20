import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

export function PrivateRoute({
  component: Component,
  isAuthenticated,
  ...rest
}) {
  isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}
