import { Component } from "react";

import RegionTypePicker from "../../nonstate/atoms/RegionTypePicker.js";

import LayerSelector from "./LayerSelector.js";
// import EntView from "../atoms/EntView.js";
import SourceView from "../../nonstate/atoms/SourceView.js";

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
      // parentRegionID,
    } = this.props;

    const renderedTitle = selectedLayerClasses.map((LayerClass) =>
      LayerClass.renderLabel()
    );

    const source = selectedLayerClasses.map((LayerClass) =>
      LayerClass.getSource()
    );

    const LayerClass = selectedLayerClasses[0]; // TODO Fix!
    const regionTypes = LayerClass.getRegionTypes();
    const showRegionTypePicker = regionTypes.length > 0;
    // <EntView entID={parentRegionID} /> Removed Parent Region

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
          <SourceView source={source} />
          <div className="div-layer-title">{renderedTitle}</div>
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
