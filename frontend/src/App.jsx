/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { StylesProvider } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import Home from "./components/HomePage/home";
import AdminHome from "./components/AdminHomePage/AdminHome";
import ManageEventsPage from "./components/ManageEventsPage/ManageEventsPage";
import AddEvent from "./components/AddEvent/AddEvent";
import { fetchEvents } from "./redux/reducers/event";
import AdminLogin from "./components/AdminLogin/AdminLogin";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  // call fetchEvents
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchEvents());
  }, []);

  return (
    <StylesProvider injectFirst>
      <Router>
        <div>
          <Switch>
            <ProtectedRoute path="/admin/add-event">
              <AddEvent />
            </ProtectedRoute>
            <ProtectedRoute path="/admin/manage-events">
              <ManageEventsPage />
            </ProtectedRoute>
            <ProtectedRoute path="/admin">
              <AdminHome />
            </ProtectedRoute>
            <Route path="/admin/login">
              <AdminLogin />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </StylesProvider>
  );
}

export default App;
