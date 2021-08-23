import { Component } from "react";

import GeoData, { getBrowserLatLng, roundLatLng } from "../../base/GeoData.js";
import Ents, { REGION_TYPES } from "../../base/Ents.js";

import { CUSTOM_LAYERS } from "../molecules/custom_layers/CustomLayers.js";
import LayerMenuView from "../molecules/LayerMenuView.js";
import GeoMap from "../molecules/GeoMap.js";
import imgGeoLocate from "../../assets/images/geolocate.png";

import "./HomePage.css";

const DEFAULT_ZOOM = 16;

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
      zoom: zoom,
      regions: undefined,
      entIndex: {},
      allEntIndex: undefined,
      lkVaxCenters: undefined,
    };
    this.onClickGeoLocate();
  }

  async componentDidMount() {
    const allEntIndex = await Ents.getAllEntIndex();

    await GeoData.getRegionsForPoint(
      this.state.center,
      this.onRegionsUpdate.bind(this)
    );

    this.setState({
      allEntIndex,
      selectedLayerClasses: [CUSTOM_LAYERS[0]],
    });
  }

  async onRegionsUpdate(center, regions) {
    this.setState({
      center,
      regions,
    });
  }

  async onMoveEnd(e) {
    const mapCenter = e.target.getCenter();
    const newZoom = e.target.getZoom();
    const newCenter = roundLatLng([mapCenter.lat, mapCenter.lng]);
    const [lat, lng] = newCenter;

    this.props.history.push(`/${lat}N,${lng}E,${newZoom}z`);

    const regions = await GeoData.getRegionsForPoint(newCenter);

    this.setState({
      zoom: newZoom,
      center: newCenter,
      regions: regions,
    });
  }

  onClickGeoLocate(e) {
    getBrowserLatLng(
      function ([lat, lng]) {
        this.setState({ center: [lat, lng], zoom: DEFAULT_ZOOM });
      }.bind(this)
    );
  }

  onSelectLayer(SelectedLayerClass) {
    this.setState({
      selectedLayerClasses: [SelectedLayerClass],
    });
  }

  render() {
    const { selectedLayerClasses, center, zoom, regions, allEntIndex } =
      this.state;
    if (!allEntIndex) {
      return "...";
    }
    let renderedRegions = "...";
    if (regions) {
      renderedRegions = REGION_TYPES.map(function (entType) {
        const regionID = regions[entType];
        if (regionID) {
          const name = allEntIndex[entType][regionID].name;
          return (
            <div className="div-rendered-region" key={`region-${regionID}`}>
              <div className="div-region-name">{name}</div>
              <div className="div-region-type">{entType.toUpperCase()}</div>
            </div>
          );
        }
        return "";
      });
    }

    return (
      <>
        <div className="div-title">
          <div className="div-rendered-regions">
            <img
              className="img-geolocate"
              src={imgGeoLocate}
              alt="geolocate"
              onClick={this.onClickGeoLocate.bind(this)}
            />
            {renderedRegions}
          </div>
        </div>
        <LayerMenuView
          onSelectLayer={this.onSelectLayer.bind(this)}
          selectedLayerClasses={selectedLayerClasses}
        />
        <GeoMap
          key={center}
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
                regions={regions}
              />
            );
          })}
        </GeoMap>
      </>
    );
  }
}
