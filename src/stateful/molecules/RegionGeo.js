import { Component } from "react";
import GeoData from "../../base/GeoData.js";
import { GeoJSON } from "react-leaflet";

const STYLE_GEOJSON = {
  fillColor: "#f00",
  fillOpacity: 0.1,
  color: "#fff",
};

export default class RegionGeo extends Component {
  constructor(props) {
    super(props);
    this.state = { geoData: undefined };
  }

  async componentDidMount() {
    const { regionType, regionID } = this.props;
    const geoData = await GeoData.getGeoForRegion(regionType, regionID);
    this.setState({ geoData });
  }

  render() {
    const { geoData } = this.state;
    if (!geoData) {
      return "...";
    }
    const geoJsonData = {
      type: "MultiPolygon",
      coordinates: geoData,
    };
    return <GeoJSON data={geoJsonData} style={STYLE_GEOJSON} />;
  }
}
