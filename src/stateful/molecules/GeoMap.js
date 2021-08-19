import {Component} from 'react';
import {MapContainer, TileLayer} from 'react-leaflet';

import './GeoMap.css';

const DEFAULT_CENTER = [6.9271, 79.8612];
const DEFAULT_ZOOM = 16;
const URL_FORMAT = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

export default class GeoMap extends Component {
  render() {
    return (
      <MapContainer center={DEFAULT_CENTER} zoom={DEFAULT_ZOOM}>
        <TileLayer url={URL_FORMAT} />
        {this.props.children}
      </MapContainer>
    );
  }
}
