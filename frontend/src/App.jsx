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
            <ProtectedRoute
              component={AddEvent}
              path="/admin/add-event"
              isAuthenticated
            >
              <AddEvent />
            </ProtectedRoute>
            <ProtectedRoute
              component={ManageEventsPage}
              path="/admin/manage-events"
              isAuthenticated={false}
            >
              <ManageEventsPage />
            </ProtectedRoute>
            <Route path="/admin/login">
              <AdminLogin />
            </Route>
            <ProtectedRoute component={AdminHome} path="/admin" isAuthenticated>
              <AdminHome />
            </ProtectedRoute>
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
