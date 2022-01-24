import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { StylesProvider } from "@material-ui/core/styles";
import Home from "./components/home";
import SignUpForm from "./components/UserSignUp/SignUpForm";

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
          </Switch>
        </div>
      </Router>
    </StylesProvider>
  );
}

export default App;
