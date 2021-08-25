import { Component } from "react";

import {
  getBrowserLatLng,
  roundLatLng,
  parseLocationStr,
} from "../../base/GeoData.js";
import Ents from "../../base/Ents.js";

import { CUSTOM_LAYERS } from "../molecules/custom_layers/CustomLayers.js";
import LayerMenuView from "../molecules/LayerMenuView.js";
import GeoMap from "../molecules/GeoMap.js";
import imgGeoLocate from "../../assets/images/geolocate.png";

import "./HomePage.css";

const DEFAULT_ZOOM = 15;

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
      childRegionType: "district",
      parentRegionType: "country",
      parentRegionID: "LK",
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

    // const [lat, lng] = newCenter;
    // const newUrl = `/metaverse/${lat}N,${lng}E,${newZoom}z`;
    // window.history.pushState({}, null, newUrl);

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

  onSelectRegionType(regionType) {
    this.setState({ childRegionType: regionType });
  }

  render() {
    const {
      selectedLayerClasses,
      center,
      selectedCenter,
      zoom,
      allEntIndex,
      childRegionType,
      parentRegionID,
      parentRegionType,
    } = this.state;

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
