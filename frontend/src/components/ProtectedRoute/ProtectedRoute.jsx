import React from "react";
import { BrowserRouter as Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
// eslint-disable-next-line no-unused-vars
import ManageEventsPage from "../ManageEventsPage/ManageEventsPage";

// eslint-disable-next-line no-unused-vars
export default function ProtectedRoute({ isAuthenticated, component, path }) {
  if (!isAuthenticated) {
    return <Redirect to="/admin/login" />;
  }

  return (
    <Route path={path}>
      {console.log({ component })}
      {/* <ManageEventsPage /> */}
    </Route>
  );
}

ProtectedRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
};
