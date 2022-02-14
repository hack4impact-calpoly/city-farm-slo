import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { StylesProvider } from "@material-ui/core/styles";
import Home from "./components/HomePage/home";
import SignUpForm from "./components/UserSignUp/SignUpForm";
import RegistrationComplete from "./components/RegistrationComplete/RegistrationComplete";

function App() {
  // lifted state for event selected
  const [selectedEvent, setEvent] = useState([]);

  return (
    <StylesProvider injectFirst>
      <Router>
        <div>
          <Switch>
            <Route exact path="/">
              <Home selectedEvent={selectedEvent} setEvent={setEvent} />
            </Route>
            <Route exact path="/registration">
              <SignUpForm selectedEvent={selectedEvent} />
            </Route>
            <Route path="/registration-complete">
              <RegistrationComplete selectedEvent={selectedEvent} />
            </Route>
          </Switch>
        </div>
      </Router>
    </StylesProvider>
  );
}

export default App;
