import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { getDefaultLatLngZoomStr } from "./base/GeoData.js";

import { DEFAULT_LAYER_CLASS_ID } from "./stateful/molecules/custom_layers/CustomLayers.js";

import HomePage from "./stateful/pages/HomePage.js";

import "./App.css";

function App() {
  const latLngStr = getDefaultLatLngZoomStr();
  return (
    <Router basename="/metaverse">
      <Switch>
        <Route path="/:layerClassID/:latLngStr" component={HomePage} />
        <Route>
          <Redirect to={`/${DEFAULT_LAYER_CLASS_ID}/${latLngStr}`} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
