import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { StylesProvider } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
// eslint-disable-next-line import/no-named-as-default
import Home from "./components/HomePage/home";
import ManageEventsPage from "./components/ManageEventsPage/ManageEventsPage";
import fetchEvents from "./redux/reducers/event";

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
            <Route path="/admin">
              <ManageEventsPage
                selectedEvent={selectedEvent}
                setEvent={setEvent}
              />
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
