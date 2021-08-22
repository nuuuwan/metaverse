import { Component } from "react";
import { Circle, Popup } from "react-leaflet";

import LKVaxCenters from "../../core/custom_data/LKVaxCenters.js";
import GeoData, { roundLatLng } from "../../base/GeoData.js";
import Ents from "../../base/Ents.js";

import GeoMap from "../molecules/GeoMap.js";

const DEFAULT_CIRLE_RADIUS = 500;

const STYLE_DIV_TITLE = {
  zIndex: 10000,
  position: "absolute",
  top: 24,
  left: 60,
  background: "white",
  borderRadius: 6,
};

const STYLE_DIV_RENDERED_REGIONS = {
  display: "table-row",
};

let STYLE_DIV_RENDERED_REGION = {
  display: "table-cell",
  padding: 6,
};

const STYLE_REGION_TYPE = {
  fontSize: "40%",
  color: "black",
};

const STYLE_REGION_NAME = {
  fontSize: "80%",
  color: "black",
};

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

  render() {
    const { customerLayers, center, zoom, regions, allEntIndex } = this.state;
    if (!allEntIndex) {
      return "...";
    }
    let renderedLayers = customerLayers.map(renderLayer);

    let renderedRegions = "...";
    if (regions) {
      const entTypes = ["province", "district", "dsd", "gnd"];
      const OPACITY_INCR = 0.8;
      let opacity = 1.0;

      renderedRegions = entTypes.map(function (entType) {
        const regionID = regions[entType];
        if (regionID) {
          const name = allEntIndex[entType][regionID].name;
          let style = Object.assign({}, STYLE_DIV_RENDERED_REGION, { opacity });
          opacity *= OPACITY_INCR;
          return (
            <div key={`region-${regionID}`} style={style}>
              <div style={STYLE_REGION_NAME}>{name}</div>
              <div style={STYLE_REGION_TYPE}>{entType.toUpperCase()}</div>
            </div>
          );
        }
        return "...";
      });
    }

    return (
      <>
        <div style={STYLE_DIV_TITLE}>
          <div style={STYLE_DIV_RENDERED_REGIONS}>{renderedRegions}</div>
        </div>
        <GeoMap
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
