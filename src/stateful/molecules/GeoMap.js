import { Component } from "react";
import {
  MapContainer,
  TileLayer,
  ZoomControl,
  useMapEvents,
} from "react-leaflet";

import { useLeafletMap } from "react-leaflet";

import "./GeoMap.css";

const URL_FORMAT = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

function EventComponent(props) {
  const map = useMapEvents({
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
        bounds={[
          [5.9, 79.5],
          [9.9, 81.9],
        ]}
        zoomControl={false}
        ref={this.mapRef}
      >
        <TileLayer url={URL_FORMAT} />
        <EventComponent onMoveEnd={this.props.onMoveEnd} />
        <ZoomControl zoom={this.props.zoom} position="bottomright" />
        {this.props.children}
      </MapContainer>
    );
  }
}
