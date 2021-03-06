import { Component } from "react";

import {
  getBrowserLatLng,
  getLatLngZoomStr,
  roundLatLng,
  parseLatLngZoomStr,
  DEFAULT_ZOOM,
} from "../../base/GeoData.js";

import { CUSTOM_LAYERS_INDEX } from "../molecules/custom_layers/CustomLayers.js";
import LayerMenuView from "../molecules/LayerMenuView.js";
import GeoMap from "../molecules/GeoMap.js";
import imgGeoLocate from "../../assets/images/geolocate.png";

import "./HomePage.css";

export default class HomePage extends Component {
  constructor(props) {
    super(props);

    const layerClassID = this.props.match.params.layerClassID;
    const latLngStr = this.props.match.params.latLngStr;
    const { lat, lng, zoom } = parseLatLngZoomStr(latLngStr);

    this.state = {
      layerClassID,
      selectedLayerClasses: [CUSTOM_LAYERS_INDEX[layerClassID]],
      center: [lat, lng],
      selectedCenter: [lat, lng],
      zoom: zoom,
      childRegionType: "pd",
      parentRegionType: "country",
      parentRegionID: "LK",
    };
  }

  async onMoveEnd(e) {
    const mapCenter = e.target.getCenter();
    const newZoom = e.target.getZoom();
    const newCenter = roundLatLng([mapCenter.lat, mapCenter.lng]);

    const latLngZoomStr = getLatLngZoomStr(newCenter, newZoom);
    const layerClassID = this.state.layerClassID;
    const newUrl = `/metaverse/${layerClassID}/${latLngZoomStr}`;
    window.history.pushState({}, null, newUrl);

    this.setState({
      zoom: newZoom,
      center: newCenter,
    });
  }

  onClickGeoLocate(e) {
    getBrowserLatLng(
      function (latLng) {
        this.setState({
          center: latLng,
          selectedCenter: latLng,
          zoom: DEFAULT_ZOOM,
        });
      }.bind(this)
    );
  }

  onSelectLayer(SelectedLayerClass) {
    const layerClassID = SelectedLayerClass.getLayerClassID();
    const latLngZoomStr = getLatLngZoomStr(this.state.center, this.state.zoom);
    const newUrl = `/metaverse/${layerClassID}/${latLngZoomStr}`;
    window.history.pushState({}, null, newUrl);

    this.setState({
      selectedLayerClasses: [SelectedLayerClass],
    });
  }

  onSelectRegionType(regionType) {
    this.setState({ childRegionType: regionType });
  }

  render() {
    const {
      selectedLayerClasses,
      center,
      selectedCenter,
      zoom,
      childRegionType,
      parentRegionID,
      parentRegionType,
    } = this.state;

    return (
      <>
        <div className="div-title">
          <img
            className="img-geolocate"
            src={imgGeoLocate}
            alt="geolocate"
            onClick={this.onClickGeoLocate.bind(this)}
          />
        </div>
        <LayerMenuView
          onSelectLayer={this.onSelectLayer.bind(this)}
          onSelectRegionType={this.onSelectRegionType.bind(this)}
          selectedLayerClasses={selectedLayerClasses}
          childRegionType={childRegionType}
          parentRegionID={parentRegionID}
        />
        <GeoMap
          key={`geomap-${selectedCenter}-${childRegionType}`}
          center={center}
          zoom={zoom}
          onMoveEnd={this.onMoveEnd.bind(this)}
        >
          {selectedLayerClasses.map(function (
            CustomLayerClass,
            iCustomLayerClass
          ) {
            return (
              <CustomLayerClass
                key={`custom-layer-class-${iCustomLayerClass}`}
                center={center}
                childRegionType={childRegionType}
                parentRegionID={parentRegionID}
                parentRegionType={parentRegionType}
              />
            );
          })}
        </GeoMap>
      </>
    );
  }
}
