import { Component } from "react";

import { CUSTOM_LAYERS } from "./custom_layers/CustomLayers.js";
import ShowHide from "../atoms/ShowHide.js";

import "./LayerSelector.css";

export default class LayerSelector extends Component {
  render() {
    const { selectedLayerClasses, onSelectLayer } = this.props;

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

    const sortedLayers = CUSTOM_LAYERS.sort(function (a, b) {
      return a.getLabel().localeCompare(b.getLabel());
    });

    return (
      <ShowHide label="Layers">
        <div className="div-layer-selector">
          {sortedLayers.map(renderLayer)}
        </div>
      </ShowHide>
    );
  }
}
