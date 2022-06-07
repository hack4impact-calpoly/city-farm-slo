/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from "react";
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
  const [isAuthenticated, setAuthenticated] = useState(false);

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
            {/* protected routes */}
            <ProtectedRoute
              exact
              path="/admin/add-event"
              component={AddEvent}
              isAuthenticated={isAuthenticated}
            />
            <ProtectedRoute
              exact
              path="/admin/manage-events"
              component={ManageEventsPage}
              isAuthenticated={isAuthenticated}
            />
            <ProtectedRoute
              exact
              path="/admin"
              component={AdminHome}
              isAuthenticated={isAuthenticated}
            />
            {/* public routes */}
            <Route exact path="/admin/login">
              <AdminLogin setAuthenticated={setAuthenticated} />
            </Route>
            <Route exact path="/" component={Home} />
          </Switch>
        </div>
      </Router>
    </StylesProvider>
  );
}

export default App;
