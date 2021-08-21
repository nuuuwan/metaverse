import {Component} from 'react';
import {Circle, Popup} from 'react-leaflet';

import LKVaxCenters from '../../core/custom_data/LKVaxCenters.js';
import GeoData, {roundLatLng} from '../../base/GeoData.js';

import GeoMap from '../molecules/GeoMap.js';

const DEFAULT_CENTER = [6.9271, 79.8612];
const DEFAULT_CIRLE_RADIUS = 500;
const STYLE_DIV_TITLE = {
  zIndex: 10000,
  position: 'absolute',
  top: 12,
  left: 60,
  background: 'rgba(224, 224, 224, 0.0)',
  padding: 12,
}

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
    this.state = {
      customerLayers: [],
      center: DEFAULT_CENTER,
      regions: undefined,
    };
  }

  async componentDidMount() {
    console.debug('HomePage.componentDidMount')
    const lkVaxCenters = await LKVaxCenters.get();
    this.setState({
      customerLayers: [lkVaxCenters],
    });
  }


  render() {
    console.debug('HomePage.render');
    const {customerLayers, center, regions} = this.state;
    const renderedLayers = customerLayers.map(renderLayer)

    const onMoveEnd = async function(e) {
      console.debug('onMoveEnd');
      const mapCenter = e.target.getCenter();
      const newCenter = roundLatLng([mapCenter.lat, mapCenter.lng]);

      const onRegionsUpdate = function(regions) {
        console.debug('onRegionsUpdate', regions);
        this.setState({regions: regions});
      }.bind(this);
      const regions = await GeoData.getRegionsForPoint(
        newCenter,
        onRegionsUpdate,
      );
      this.setState({
          center: newCenter,
      });
    }.bind(this)

    let renderedRegions = 'Searching...';
    if (regions) {
      renderedRegions = regions.gnd || regions.dsd || regions.district || regions.provice || 'Searching...';
    }

    return (
      <>
        <div style={STYLE_DIV_TITLE}>
          <h1>{renderedRegions}</h1>
        </div>
        <GeoMap center={center} onMoveEnd={onMoveEnd}>
          {renderedLayers}
        </GeoMap>
      </>
    );
  }
}
