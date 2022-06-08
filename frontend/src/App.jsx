import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { StylesProvider } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import Home from "./components/HomePage/home";
import AdminHome from "./components/AdminHomePage/AdminHome";
import ManageEventsPage from "./components/ManageEventsPage/ManageEventsPage";
import AddEvent from "./components/AddEvent/AddEvent";
import EditEvent from "./components/EditEvent/EditEvent";
import { fetchEvents } from "./redux/reducers/event";
import AdminLogin from "./components/AdminLogin/AdminLogin";
import VolunteerDatabase from "./components/VolunteerDatabase/VolunteerDatabase";

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
            <Route path="/admin/add-event">
              <AddEvent />
            </Route>
            <Route path="/admin/edit-event">
              <EditEvent />
            </Route>
            <Route path="/admin/manage-events">
              <ManageEventsPage />
            </Route>
            <Route path="/admin/volunteer-db">
              <VolunteerDatabase />
            </Route>
            <Route path="/admin/login">
              <AdminLogin />
            </Route>
            <Route path="/admin">
              <AdminHome />
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
