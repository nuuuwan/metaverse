import { Component } from "react";

import Ents, {ENT} from '../../base/Ents.js';
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
    const { onSelectLayer, onSelectRegionType, selectedLayerClasses, childRegionType } = this.props;

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
        <RegionTypePicker onSelectRegionType={onSelectRegionType} selectedRegionType={childRegionType}/>
        <input
          className="input-text-layers"
          type="text"
          placeholder="Search Layers"
          onChange={this.onInputTextLayersChange.bind(this)}
        />

        {matchingLayerClasses.map(renderLayer)}
        <div className="div-common-layer-header">
          Commonly Used Layers
        </div>
        {POPULAR_CUSTOM_LAYERS.map(renderLayer)}
      </div>
    );
  }
}

class RegionTypePicker extends Component {
  render() {
    const {selectedRegionType, onSelectRegionType} = this.props;
    const regionTypes = [ENT.PROVINCE, ENT.DISTRICT, ENT.DSD];

    const renderedItems = regionTypes.map(
      function(regionType) {
        const regionName = Ents.getRegionName(regionType);
        const onClick = function(e) {
          onSelectRegionType(regionType);
        };

        const className = 'span-region-type-picker-item' + ((regionType === selectedRegionType) ? ' span-region-type-picker-item-selected': '');
        return (
          <span
            key={`region-type-picker-item-${regionType}`}
            className={className}
            onClick={onClick}
          >
            {`${regionName}`}
          </span>
        )
      },
    );
    return (
      <div className="div-region-type-picker">
        <span className="div-region-type-picker-desc"> By</span>
        {renderedItems}
      </div>
    )
  }
}
