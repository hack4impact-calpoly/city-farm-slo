import React from "react";
import { BrowserRouter as Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

export default function ProtectedRoute({ isAuthenticated, children, ...rest }) {
  // const auth = useAuth();
  return (
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/admin/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

ProtectedRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
};
