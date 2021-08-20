import {Component} from 'react';
import GeoMap from '../molecules/GeoMap.js';
import LKVaxCenters from '../../core/custom_data/LKVaxCenters.js';
import {Circle, Popup} from 'react-leaflet';

const DEFAULT_CIRLE_RADIUS = 200;

function renderLayer(layer) {
  return layer.map(
    function(layerItem) {
      if (!layerItem.lat) {
        return null;
      }
      const position = [
          parseFloat(layerItem.lat),
          parseFloat(layerItem.lng),
      ];

      let color = "green";
      if (layerItem.tags) {
        color = "red"
      }
      return (
        <Circle
          center={position}
          radius={DEFAULT_CIRLE_RADIUS}
          pathOptions={{color: color}}
        >
          <Popup>
            <h3>{layerItem.center}</h3>
            <h3>{layerItem.center_si}</h3>
            <h3>{layerItem.center_ta}</h3>

            <ul>
              <li>{layerItem.formatted_address}</li>
              <li>{layerItem.formatted_address_si}</li>
              <li>{layerItem.formatted_address_ta}</li>
            </ul>

            <hr/>
            <div>
              {layerItem.police} Police Area,
              {layerItem.district} District
            </div>
            <div>{layerItem.tags}</div>
          </Popup>
        </Circle>
      );
    }
  )
}

export default class HomePage extends Component {

  constructor(props) {
    super(props);
    this.state = {customerLayers: []};
  }

  async componentDidMount() {
    const lkVaxCenters = await LKVaxCenters.get();
    this.setState({customerLayers: [lkVaxCenters]});
  }

  render() {
    const renderedLayers = this.state.customerLayers.map(renderLayer)

    return (
      <>
        <GeoMap>
          {renderedLayers}
        </GeoMap>
      </>
    );
  }
}
