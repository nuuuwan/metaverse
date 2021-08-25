import { Component } from "react";

import { CUSTOM_LAYERS } from "./custom_layers/CustomLayers.js";
import ShowHide from "../atoms/ShowHide.js";

import "./LayerSelector.css";

const MIN_SEARCH_TEXT_LENGTH = 1;

export default class LayerSelector extends Component {
  constructor(props) {
    super(props);
    this.state = { compMatchingLayerClasses: [] };
  }

  render() {
    const { compMatchingLayerClasses } = this.state;
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

    const onInputTextLayersChange = function (e) {
      const searchText = e.target.value.toLowerCase();
      if (searchText.length > MIN_SEARCH_TEXT_LENGTH) {
        const compMatchingLayerClasses = CUSTOM_LAYERS.filter((LayerClass) =>
          LayerClass.isMatch(searchText)
        );
        this.setState({ compMatchingLayerClasses });
      } else {
        this.setState({ compMatchingLayerClasses: [] });
      }
    }.bind(this);

    return (
      <ShowHide label="Layers">
        <div className="div-layer-selector">
          <input
            className="input-text-layers"
            type="text"
            placeholder="Search Layers"
            onKeyDown={onInputTextLayersChange}
          />
          {compMatchingLayerClasses.map(renderLayer)}
        </div>
      </ShowHide>
    );
  }
}
