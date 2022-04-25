import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { StylesProvider } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import Home from "./components/HomePage/home";
import AdminHome from "./components/AdminHomePage/AdminHome";
import ManageEventsPage from "./components/ManageEventsPage/ManageEventsPage";
import fetchEvents from "./redux/reducers/event";
import AdminLogin from "./components/AdminLogin/AdminLogin";

function App() {
  // lifted state for event selected
  const [selectedEvent, setEvent] = useState([]);
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
            <Route path="/admin/manage-events">
              <ManageEventsPage
                selectedEvent={selectedEvent}
                setEvent={setEvent}
              />
            </Route>
            <Route path="/admin/login">
              <AdminLogin />
            </Route>
            <Route path="/admin">
              <AdminHome selectedEvent={selectedEvent} setEvent={setEvent} />
            </Route>
            <Route path="/">
              <Home selectedEvent={selectedEvent} setEvent={setEvent} />
            </Route>
          </Switch>
        </div>
      </Router>
    </StylesProvider>
  );
}

export default App;
