import { Component } from "react";
import { LAYERS } from "../../constants/Layers.js";

import "./LayerView.css";

export default class LayerView extends Component {
  constructor(props) {
    super(props);
    this.state = { matchingLayers: [] };
  }
  onInputTextLayersChange(e) {
    const searchText = e.target.value.toLowerCase();
    if (searchText.length > 5) {
      const matchingLayers = LAYERS.filter((layerName) =>
        layerName.toLowerCase().includes(searchText)
      );
      this.setState({ matchingLayers });
    }
  }
  render() {
    const { matchingLayers } = this.state;
    return (
      <div className="div-layer-view">
        <input
          className="input-text-layers"
          type="text"
          placeholder="Search Layers"
          onChange={this.onInputTextLayersChange.bind(this)}
        />
        <ul>
          {matchingLayers.map(function (layer) {
            return <li key={`li-${layer}`}>{layer}</li>;
          })}
        </ul>
      </div>
    );
  }
}
