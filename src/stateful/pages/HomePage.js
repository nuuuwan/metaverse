import {Component} from 'react';
import {Circle, Popup} from 'react-leaflet';

import LKVaxCenters from '../../core/custom_data/LKVaxCenters.js';
import GeoData, {roundLatLng} from '../../base/GeoData.js';
import Ents from '../../base/Ents.js';

import GeoMap from '../molecules/GeoMap.js';

const DEFAULT_CENTER = [6.9271, 79.8612];
const DEFAULT_CIRLE_RADIUS = 500;

const STYLE_DIV_TITLE = {
  zIndex: 10000,
  position: 'absolute',
  top: 24,
  left: 60,
  background: 'white',
  borderRadius: 12,
}

const STYLE_DIV_RENDERED_REGIONS = {
  display: 'table-row',
}

const STYLE_DIV_RENDERED_REGION = {
  display: 'table-cell',
  padding: 6,
}

const STYLE_REGION_TYPE = {
  fontSize: 'xx-small',
  color: '#ccc',
}

const STYLE_REGION_NAME = {
  fontSize: 'small',
  color: '#888',
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
      entIndex: {},
    };
  }

  async componentDidMount() {
    const allEntIndex = await Ents.getAllEntIndex();
    const lkVaxCenters = await LKVaxCenters.get();

    this.setState({
      allEntIndex,
      customerLayers: [lkVaxCenters],
    });
  }


  render() {

    const {customerLayers, center, regions, allEntIndex} = this.state;
    const renderedLayers = customerLayers.map(renderLayer)

    const onMoveEnd = async function(e) {
      const mapCenter = e.target.getCenter();
      const newCenter = roundLatLng([mapCenter.lat, mapCenter.lng]);

      const onRegionsUpdate = function(center, regions) {
        this.setState({
          center,
          regions,
        });
      }.bind(this);

      await GeoData.getRegionsForPoint(
        newCenter,
        onRegionsUpdate,
      );

    }.bind(this)

    let renderedRegions = '...';
    if (regions) {
      const entTypes = ['province', 'district', 'dsd', 'gnd'];
      renderedRegions = entTypes.map(
        function(entType) {
          const regionID = regions[entType];
          if (regionID) {
            const name = allEntIndex[entType][regionID].name;
            return (
              <div style={STYLE_DIV_RENDERED_REGION}>
                <div style={STYLE_REGION_NAME}>{name}</div>
                <div style={STYLE_REGION_TYPE}>{entType.toUpperCase()}</div>
              </div>
            )
          }
          return null;
        }
      );
    }

    return (
      <>
        <div style={STYLE_DIV_TITLE}>
          <div style={STYLE_DIV_RENDERED_REGIONS}>
            {renderedRegions}
          </div>
        </div>
        <GeoMap center={center} onMoveEnd={onMoveEnd}>
          {renderedLayers}
        </GeoMap>
      </>
    );
  }
}
