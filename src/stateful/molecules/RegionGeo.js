import { Component } from "react";
import { GeoJSON, Popup } from "react-leaflet";

import GeoData from "../../base/GeoData.js";
import Ents, { ENT_TO_NAME, PARENT_TO_CHILD } from "../../base/Ents.js";

import EntView from "../atoms/EntView.js";

import "./RegionGeo.css";

const STYLE_GEOJSON = {
  color: "white",
  fillColor: "red",
  fillOpacity: 0.5,
  weight: 1,
};

export default class RegionGeo extends Component {
  constructor(props) {
    super(props);
    this.state = { geoData: undefined, ent: undefined };
  }

  async componentDidMount() {
    this.isComponentMounted = true;
    const { regionID } = this.props;
    const geoData = await GeoData.getGeoForRegion(regionID);
    const ent = await Ents.getEnt(regionID);

    if (this.isComponentMounted) {
      this.setState({ geoData, ent });
    }
  }

  componentWillUnmount() {
    this.isComponentMounted = false;
  }

  render() {
    const { geoData } = this.state;
    if (!geoData) {
      return "...";
    }

    const { regionType, regionID, onClick, renderCustom, iRegion } = this.props;

    const geoJsonData = {
      type: "MultiPolygon",
      coordinates: geoData,
    };

    let buttonShow = null;
    const subRegionType = PARENT_TO_CHILD[regionType];
    if (subRegionType) {
      const subRegionTypeName = ENT_TO_NAME[subRegionType];
      const onClickInner = function () {
        onClick(regionType, regionID);
      };
      buttonShow = (
        <div className="div-show" onClick={onClickInner}>
          Show
          <strong>{` ${subRegionTypeName}s`}</strong>
        </div>
      );
    }

    let style = STYLE_GEOJSON;
    if (this.props.color) {
      style.fillColor = this.props.color;
    }

    return (
      <GeoJSON
        className="geojson"
        key={`geojson-${regionID}`}
        data={geoJsonData}
        style={style}
      >
        <Popup>
          <h2>
            <EntView entID={regionID} />
          </h2>
          {buttonShow}
          <hr />
          {renderCustom(iRegion)}
        </Popup>
      </GeoJSON>
    );
  }
}
