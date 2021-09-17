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

    const source = selectedLayerClasses.map((LayerClass) =>
      LayerClass.getSource()
    );

    const LayerClass = selectedLayerClasses[0]; // TODO Fix!
    const regionTypes = LayerClass.getRegionTypes();
    const showRegionTypePicker = regionTypes.length > 0;

    return (
      <div>
        <div className="div-layer-view">
          <LayerSelector
            matchingLayerClasses={matchingLayerClasses}
            selectedLayerClasses={selectedLayerClasses}
            onSelectLayer={onSelectLayer}
          />
        </div>
        <div className="div-layer-view-2">
          <div className="div-layer-title">{title}</div>
          <div className="div-layer-source">
            {"Source: "}
            <a className="a-layer-source-link" href={source} target="-_blank">
              {source}
            </a>
          </div>
          <EntView entID={parentRegionID} />
          {showRegionTypePicker ? (
            <RegionTypePicker
              onSelectRegionType={onSelectRegionType}
              selectedRegionType={childRegionType}
              regionTypes={regionTypes}
            />
          ) : null}
        </div>
      </div>
    );
  }
}
