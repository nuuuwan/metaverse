import {MapContainer, TileLayer} from 'react-leaflet';

export default class HomePage extends Component {
  render() {
    const [lat, lng] = [6.9271, 79.8612];
    const zoom = 16;

    return (
      <MapContainer center={[lat, lng]} zoom={zoom}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </MapContainer>
    );
  }
}
