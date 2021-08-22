import {Component} from 'react';
import {MapContainer, TileLayer, useMapEvents} from 'react-leaflet';

import './GeoMap.css';

const DEFAULT_ZOOM = 16;
const URL_FORMAT = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

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
      <MapContainer center={this.props.center} zoom={DEFAULT_ZOOM} >
        <TileLayer url={URL_FORMAT}/>
        <EventComponent onMoveEnd={this.props.onMoveEnd}/>
        {this.props.children}
        <div className="div-center-marker">
        </div>
      </MapContainer>
    );
  }
}
