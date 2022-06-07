/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from "react";
import { BrowserRouter as Redirect, Route } from "react-router-dom";

export default function ProtectedRoute({
  isAuthenticated,
  component: Component,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="admin/login" />
        )
      }
    />
  );
}
