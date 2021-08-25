import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { DEFAULT_LAYER_CLASS_ID } from "./stateful/molecules/custom_layers/CustomLayers.js";

import HomePage from "./stateful/pages/HomePage.js";

import "./App.css";

function App() {
  return (
    <Router basename="/metaverse">
      <Switch>
        <Route path="/:layerClassID" component={HomePage} />
        <Route>
          <Redirect to={`/${DEFAULT_LAYER_CLASS_ID}`} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
