import { Component } from "react";
import GeoData from "../../base/GeoData.js";
import Ents, { ENT_TO_NAME } from "../../base/Ents.js";
import { GeoJSON, Popup } from "react-leaflet";

import "./RegionGeo.css";

const STYLE_GEOJSON = {
  color: "#f00",
  fillOpacity: 0.1,
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
    const { regionType } = this.props;
    const { geoData, ent } = this.state;
    if (!geoData) {
      return "...";
    }
    const geoJsonData = {
      type: "MultiPolygon",
      coordinates: geoData,
    };

    const onMouseOver = function (e) {
      e.target.openPopup();
    };

    return (
      <GeoJSON
        className="geojson"
        data={geoJsonData}
        style={STYLE_GEOJSON}
        eventHandlers={{ mouseover: onMouseOver }}
      >
        <Popup>
          <h2>
            <span className="div-region-name-geojson">{ent.name}</span>
          </h2>
          <h2>
            <span className="div-region-type-geojson">
              {ENT_TO_NAME[regionType]}
            </span>
          </h2>
          <hr />
          <table>
            <tbody>
              <tr>
                <th>Population</th>
                <td className="td-value">
                  {parseInt(ent.population).toLocaleString()}
                </td>
              </tr>
              <tr>
                <th>Area</th>
                <td className="td-value">
                  {parseFloat(ent.area).toLocaleString()}
                  {" km²"}
                </td>
              </tr>
              <tr>
                <th>Altitude (Centroid)</th>
                <td className="td-value">
                  {parseFloat(ent.centroid_altitude).toLocaleString()}
                  {" m"}
                </td>
              </tr>
            </tbody>
          </table>
        </Popup>
      </GeoJSON>
    );
  }
}
