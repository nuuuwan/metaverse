import react, {Component} from 'react';
import GeoMap from '../molecules/GeoMap.js';
import LKVaxCenters from '../../core/custom_data/LKVaxCenters.js';
import {Circle, Popup} from 'react-leaflet';

const DEFAULT_CIRLE_RADIUS = 200;

function renderLayer(layer) {
  return layer.map(
    function(layerItem) {
      const position = [
          parseFloat(layerItem.lat),
          parseFloat(layerItem.lng),
      ];
      return (
        <Circle center={position} radius={DEFAULT_CIRLE_RADIUS}>
          <Popup>
            <h3>{layerItem.center}</h3>
            <div>{layerItem.formatted_address}</div>
            <div>...</div>
            <div><strong>{`${layerItem.police} `}</strong>Police Area</div>
            <div><strong>{`${layerItem.district} `}</strong>District</div>
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
    console.log(this.state);
    const renderedLayers = this.state.customerLayers.map(renderLayer)

    return (
      <GeoMap>
        {renderedLayers}
      </GeoMap>
    );
  }
}
