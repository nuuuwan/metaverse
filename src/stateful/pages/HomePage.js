import { Component } from "react";
import { Circle, Popup } from "react-leaflet";

import LKVaxCenters from "../../core/custom_data/LKVaxCenters.js";
import GeoData, { getBrowserLatLng, roundLatLng } from "../../base/GeoData.js";
import Ents, { REGION_TYPES } from "../../base/Ents.js";

import LayerMenuView from "../molecules/LayerMenuView.js";
import GeoMap from "../molecules/GeoMap.js";
import imgGeoLocate from "../../assets/images/geolocate.png";

import "./HomePage.css";

const DEFAULT_CIRLE_RADIUS = 500;
const DEFAULT_ZOOM = 16;

function renderLayer(layer) {
  return layer.map(function (layerItem) {
    if (!layerItem.lat) {
      return null;
    }
    const position = [parseFloat(layerItem.lat), parseFloat(layerItem.lng)];

    let color = "green";
    if (layerItem.tags) {
      color = "red";
    }
    return (
      <Circle
        center={position}
        radius={DEFAULT_CIRLE_RADIUS}
        pathOptions={{ color: color }}
      >
        <Popup>
          <h3>{layerItem.center}</h3>
          <h3>{layerItem.center_si}</h3>
          <h3>{layerItem.center_ta}</h3>

          <ul>
            <li>{layerItem.formatted_address}</li>
            <li>{layerItem.formatted_address_si}</li>
            <li>{layerItem.formatted_address_ta}</li>
          </ul>

          <hr />
          <div>
            {layerItem.police} Police Area,
            {layerItem.district} District
          </div>
          <div>{layerItem.tags}</div>
        </Popup>
      </Circle>
    );
  });
}

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
      customerLayers: [],
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
    const lkVaxCenters = await LKVaxCenters.get();

    await GeoData.getRegionsForPoint(
      this.state.center,
      this.onRegionsUpdate.bind(this)
    );

    this.setState({
      allEntIndex,
      customerLayers: [lkVaxCenters],
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

    this.setState({
      zoom: newZoom,
    });

    await GeoData.getRegionsForPoint(
      newCenter,
      this.onRegionsUpdate.bind(this)
    );
  }

  onClickGeoLocate(e) {
    getBrowserLatLng(
      function ([lat, lng]) {
        console.debug([lat, lng]);
        this.setState({ center: [lat, lng], zoom: DEFAULT_ZOOM });
      }.bind(this)
    );
  }

  render() {
    const { customerLayers, center, zoom, regions, allEntIndex } = this.state;
    if (!allEntIndex) {
      return "...";
    }
    let renderedLayers = customerLayers.map(renderLayer);

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
        <LayerMenuView />
        <GeoMap
          key={center}
          center={center}
          zoom={zoom}
          onMoveEnd={this.onMoveEnd.bind(this)}
        >
          {renderedLayers}
        </GeoMap>
      </>
    );
  }
}
