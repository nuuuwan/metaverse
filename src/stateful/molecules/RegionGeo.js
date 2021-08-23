import { Component } from "react";
import GeoData from "../../base/GeoData.js";
import Ents from "../../base/Ents.js";
import { GeoJSON, Popup } from "react-leaflet";

import "./RegionGeo.css";

const STYLE_GEOJSON = {
  color: "#f00",
  fillOpacity: 0.1,
  color: "#f00",
};


export default class RegionGeo extends Component {
  constructor(props) {
    super(props);
    this.state = { geoData: undefined };
  }

  async componentDidMount() {
    const { regionType, regionID } = this.props;
    const geoData = await GeoData.getGeoForRegion(regionType, regionID);
    const ent = await Ents.getEnt(regionType, regionID);
    this.setState({ geoData, ent });
  }

  render() {
    const { regionType, regionID } = this.props;
    const { geoData, ent } = this.state;
    if (!geoData) {
      return "...";
    }
    const geoJsonData = {
      type: "MultiPolygon",
      coordinates: geoData,
    };

    const onLoad = function(e) {
      e.target.openPopup();
    }

    return (
      <GeoJSON className="geojson" data={geoJsonData} style={STYLE_GEOJSON} eventHandlers={{mouseover      : onLoad}}>
        <Popup>
          <div>
            <span className="div-region-name-geojson">{ent.name}</span>
            <span className="div-region-type-geojson">
              {regionType.toUpperCase()}
            </span>
          </div>
          <table>
            <tbody>
              <tr>
                <th>Population</th>
                <td>{ent.population.toLocaleString("en-US")}</td>
              </tr>
              <tr>
                <th>Area</th>
                <td>{ent.area.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </Popup>
      </GeoJSON>
    );
  }
}
