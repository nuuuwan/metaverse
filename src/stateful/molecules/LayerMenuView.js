import { Component } from "react";

import RegionTypePicker from "../../nonstate/atoms/RegionTypePicker.js";

import LayerSelector from "./LayerSelector.js";
import EntView from "../atoms/EntView.js";

import "./LayerMenuView.css";

export default class LayerMenuView extends Component {
  constructor(props) {
    super(props);
    this.state = { matchingLayerClasses: [] };
  }
  render() {
    const { matchingLayerClasses } = this.state;
    const {
      onSelectLayer,
      onSelectRegionType,
      selectedLayerClasses,
      childRegionType,
      parentRegionID,
    } = this.props;

    const title = selectedLayerClasses.map((LayerClass) =>
      LayerClass.getLabel()
    );

    return (
      <div className="div-layer-view">
        <h1>{title}</h1>
        <EntView entID={parentRegionID} />
        <RegionTypePicker
          onSelectRegionType={onSelectRegionType}
          selectedRegionType={childRegionType}
        />
        <LayerSelector
          matchingLayerClasses={matchingLayerClasses}
          selectedLayerClasses={selectedLayerClasses}
          onSelectLayer={onSelectLayer}
        />
      </div>
    );
  }
}
