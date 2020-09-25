import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//Import Screens
import HomePage from "./screens/HomePage";
import RegistrationsPage from "./screens/RegistrationsPage";
import TransferPage from "./screens/TransferPage";
import ViewTransactionsPage from "./screens/ViewTransactionsPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route path="/transfer" component={TransferPage} exact />
          <Route path="/view" component={ViewTransactionsPage} exact />
          <Route path="/signup" component={RegistrationsPage} exact />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
