import { Component } from "react";
import {
  MapContainer,
  TileLayer,
  ZoomControl,
  useMapEvents,
} from "react-leaflet";

import "./GeoMap.css";

import imgGeoLocate from "../../assets/images/geolocate.png";

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
    const { center, zoom, onMoveEnd } = this.props;
    return (
      <MapContainer center={center} zoom={zoom} zoomControl={false}>
        <TileLayer url={URL_FORMAT} />
        <EventComponent onMoveEnd={onMoveEnd} />
        <ZoomControl zoom={zoom} position="bottomright" />
        {this.props.children}
        <img
          className="img-geolocate-geo-map"
          src={imgGeoLocate}
          alt={"geolocate"}
        />
      </MapContainer>
    );
  }
}
