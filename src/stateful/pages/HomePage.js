import { Component } from "react";

import { getBrowserLatLng, roundLatLng } from "../../base/GeoData.js";
import Ents from "../../base/Ents.js";

import { CUSTOM_LAYERS } from "../molecules/custom_layers/CustomLayers.js";
import LayerMenuView from "../molecules/LayerMenuView.js";
import GeoMap from "../molecules/GeoMap.js";
import imgGeoLocate from "../../assets/images/geolocate.png";

import "./HomePage.css";

const DEFAULT_ZOOM = 15;

function parseLocationStr(locationStr) {
  const [latStr, lngStr, zoomStr] = locationStr.split(",");
  const lat = parseFloat(latStr.replace("N", ""));
  const lng = parseFloat(lngStr.replace("E", ""));
  const zoom = parseInt(zoomStr.replace("z", ""));
  return { lat, lng, zoom };
}

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    const locationStr = this.props.match.params.locationStr;
    const { lat, lng, zoom } = parseLocationStr(locationStr);

    this.state = {
      selectedLayerClasses: [],
      center: [lat, lng],
      selectedCenter: [lat, lng],
      zoom: zoom,
      entIndex: {},
      allEntIndex: undefined,
    };
  }

  async componentDidMount() {
    const allEntIndex = await Ents.getAllEntIndex();

    this.setState({
      allEntIndex,
      selectedLayerClasses: [CUSTOM_LAYERS[0]],
    });
  }

  async onMoveEnd(e) {
    const mapCenter = e.target.getCenter();

    const newZoom = e.target.getZoom();
    const newCenter = roundLatLng([mapCenter.lat, mapCenter.lng]);
    const [lat, lng] = newCenter;

    const newUrl = `/metaverse/${lat}N,${lng}E,${newZoom}z`;
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
    this.setState({
      selectedLayerClasses: [SelectedLayerClass],
    });
  }

  render() {
    const { selectedLayerClasses, center, selectedCenter, zoom, allEntIndex } =
      this.state;

    if (!allEntIndex) {
      return "...";
    }

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
          selectedLayerClasses={selectedLayerClasses}
        />
        <GeoMap
          key={`geomap-${selectedCenter}`}
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
              />
            );
          })}
        </GeoMap>
      </>
    );
  }
}
