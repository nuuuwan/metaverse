import react, {Component} from 'react';
import GeoMap from '../molecules/GeoMap.js';
import LKVaxCenters from '../../core/custom_data/LKVaxCenters.js';
import {Marker} from 'react-leaflet';

function renderLayer(layer) {
  return layer.map(
    function(layerItem) {
      const position = [
          parseFloat(layerItem.lat),
          parseFloat(layerItem.lng),
      ];
      return <Marker position={position} />;
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
