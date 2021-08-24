import { Component } from "react";
import {
  CUSTOM_LAYERS,
  POPULAR_CUSTOM_LAYERS,
} from "./custom_layers/CustomLayers.js";

import "./LayerMenuView.css";

const MIN_SEARCH_TEXT_LENGTH = 1;

export default class LayerMenuView extends Component {
  constructor(props) {
    super(props);
    this.state = { matchingLayerClasses: [] };
  }
  onInputTextLayersChange(e) {
    const searchText = e.target.value.toLowerCase();
    if (searchText.length > MIN_SEARCH_TEXT_LENGTH) {
      const matchingLayerClasses = CUSTOM_LAYERS.filter((LayerClass) =>
        LayerClass.isMatch(searchText)
      );
      this.setState({ matchingLayerClasses });
    }
  }
  render() {
    const { matchingLayerClasses } = this.state;
    const { onSelectLayer, selectedLayerClasses } = this.props;

    const renderLayer = function (LayerClass) {
      const label = LayerClass.getLabel();
      const onClick = function (e) {
        onSelectLayer(LayerClass);
      };

      let className = "div-layer";
      if (selectedLayerClasses.includes(LayerClass)) {
        className += " div-layer-selected";
      }
      return (
        <div className={className} key={`li-${label}`} onClick={onClick}>
          {label}
        </div>
      );
    };

    const title = selectedLayerClasses.map((LayerClass) =>
      LayerClass.getLabel()
    );

    return (
      <div className="div-layer-view">
        <h1>{title}</h1>
        <input
          className="input-text-layers"
          type="text"
          placeholder="Search Layers"
          onChange={this.onInputTextLayersChange.bind(this)}
        />
        {matchingLayerClasses.map(renderLayer)}
        <div className="div-common-layer-header">Commonly Used Layers</div>
        {POPULAR_CUSTOM_LAYERS.map(renderLayer)}
      </div>
    );
  }
}
