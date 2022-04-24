import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { StylesProvider } from "@material-ui/core/styles";
import Home from "./components/HomePage/home";
import ManageEventsPage from "./components/ManageEventsPage/ManageEventsPage";
import AdminLogin from "./components/Admin/AdminLogin";

function App() {
  // lifted state for event selected
  const [selectedEvent, setEvent] = useState([]);

  return (
    <StylesProvider injectFirst>
      <Router>
        <div>
          <Switch>
            <Route path="/admin">
              <ManageEventsPage
                selectedEvent={selectedEvent}
                setEvent={setEvent}
              />
            </Route>
            <Route path="/admin-login">
              <AdminLogin />
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
