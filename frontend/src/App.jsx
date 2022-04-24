import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { StylesProvider } from "@material-ui/core/styles";
import Home from "./components/HomePage/home";
import AdminHome from "./components/AdminHomePage/AdminHome";
import ManageEventsPage from "./components/ManageEventsPage/ManageEventsPage";

function App() {
  // lifted state for event selected
  const [selectedEvent, setEvent] = useState([]);

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
