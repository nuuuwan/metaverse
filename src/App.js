import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import HomePage from "./stateful/pages/HomePage.js";

import "./App.css";

function App() {
  return (
    <Router basename="/metaverse">
      <Switch>
        <Route path="/:locationStr" component={HomePage} />
        <Route>
          <Redirect to={`/6.9157N,79.8636E,15z`} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
