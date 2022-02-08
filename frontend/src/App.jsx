import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { StylesProvider } from "@material-ui/core/styles";
import Home from "./components/HomePage/home";
import SignUpForm from "./components/UserSignUp/SignUpForm";
import RegistrationComplete from "./components/RegistrationComplete/RegistrationComplete";

function App() {
  return (
    <StylesProvider injectFirst>
      <Router>
        <div>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/registration">
              <SignUpForm />
            </Route>
            <Route path="/registration-complete">
              <RegistrationComplete />
            </Route>
          </Switch>
        </div>
      </Router>
    </StylesProvider>
  );
}

export default App;
