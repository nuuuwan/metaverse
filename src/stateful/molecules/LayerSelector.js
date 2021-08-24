import { Component } from "react";

import {
  CUSTOM_LAYERS,
  POPULAR_CUSTOM_LAYERS,
} from "./custom_layers/CustomLayers.js";

const MIN_SEARCH_TEXT_LENGTH = 1;

export default class LayerSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {compMatchingLayerClasses: []};
  }

  render() {
    const { compMatchingLayerClasses } =
      this.state;
    const { selectedLayerClasses, onSelectLayer } =
        this.props;

    function renderLayer(LayerClass) {
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
    }

    const onInputTextLayersChange = function(e) {
      const searchText = e.target.value.toLowerCase();
      if (searchText.length > MIN_SEARCH_TEXT_LENGTH) {
        const compMatchingLayerClasses = CUSTOM_LAYERS.filter((LayerClass) =>
          LayerClass.isMatch(searchText)
        );
        this.setState({ compMatchingLayerClasses });
      }
    }.bind(this);

    return (
      <div className="div-layer-selector">
        <input
          className="input-text-layers"
          type="text"
          placeholder="Search Layers"
          onChange={onInputTextLayersChange}
        />
        {compMatchingLayerClasses.map(renderLayer)}
        <div className="div-common-layer-header">Commonly Used Layers</div>
        {POPULAR_CUSTOM_LAYERS.map(renderLayer)}
      </div>
    );
  }
}
