import { Component } from "react";
import { CUSTOM_LAYERS } from "./custom_layers/CustomLayers.js";

import "./LayerMenuView.css";

export default class LayerMenuView extends Component {
  constructor(props) {
    super(props);
    this.state = { matchingLayerClasses: [] };
  }
  onInputTextLayersChange(e) {
    const searchText = e.target.value.toLowerCase();
    if (searchText.length > 5) {
      const matchingLayerClasses = CUSTOM_LAYERS.filter((LayerClass) =>
        LayerClass.isMatch(searchText)
      );
      this.setState({ matchingLayerClasses });
    }
  }
  render() {
    const { matchingLayerClasses } = this.state;
    return (
      <div className="div-layer-view">
        <input
          className="input-text-layers"
          type="text"
          placeholder="Search Layers"
          onChange={this.onInputTextLayersChange.bind(this)}
        />
        <ul>
          {matchingLayerClasses.map(function (LayerClass) {
            const label = LayerClass.getLabel();
            return <li key={`li-${label}`}>{label}</li>;
          })}
        </ul>
      </div>
    );
  }
}
