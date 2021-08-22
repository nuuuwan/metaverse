import { Component } from "react";
import {
  MapContainer,
  TileLayer,
  ZoomControl,
  useMapEvents,
} from "react-leaflet";

import "./GeoMap.css";

const URL_FORMAT = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

function EventComponent(props) {
  useMapEvents({
    moveend: (e) => {
      props.onMoveEnd(e);
    },
  });
  return null;
}

export default class GeoMap extends Component {
  render() {
    return (
      <MapContainer
        center={this.props.center}
        zoom={this.props.zoom}
        zoomControl={false}
      >
        <TileLayer url={URL_FORMAT} />
        <EventComponent onMoveEnd={this.props.onMoveEnd} />
        {this.props.children}
        <div className="div-center-marker" />
        <ZoomControl zoom={this.props.zoom} position="bottomright" />
      </MapContainer>
    );
  }
}
