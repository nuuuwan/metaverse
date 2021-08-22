import {Component} from 'react';
import GeoData, {roundLatLng} from '../../base/GeoData.js';
import {GeoJSON} from 'react-leaflet';

const STYLE_GEOJSON = {
  fillColor: '#f00',
  fillOpacity: 0.1,
  color: '#f00',
}

export default class RegionGeoLayer extends Component {
  constructor(props) {
    super(props);
    this.state = {geoData: undefined};
  }

  async componentDidMount() {
    const {regionType, regionID} = this.props;
    const geoData = await GeoData.getGeoForRegion(regionType, regionID);
    this.setState({geoData});
  }

  render() {
    const {geoData} = this.state;
    if (!geoData) {
      return '...';
    }
    const geoJsonData = {
      'type': 'MultiPolygon',
      'coordinates': geoData,
    };
    console.debug(geoJsonData);
    return <GeoJSON data={geoJsonData} style={STYLE_GEOJSON} />
  }

}
