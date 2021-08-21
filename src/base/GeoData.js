import WWW from './WWW.js';

function isPointInPolygon(point, polygon) {
  const [y, x] = point;
  let nIntersects = 0;
  for (let i in polygon) {
    const j = (i - 1 + polygon.length) % polygon.length;

    const [xi, yi] = polygon[i];
    const  [xj, yj] = polygon[j];

    const intersect = ((yi > y) !== (yj > y))
        && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    if (intersect) {
      nIntersects += 1;
    }

  }
  return ((nIntersects % 2) === 1);
}

function isPointInMultiMultiPolygon(point, multiMultiPolygon) {
  for (let i in multiMultiPolygon) {
    const multiPolygon = multiMultiPolygon[i];
    for (let j in multiPolygon) {
      const polygon = multiPolygon[j];
      if (isPointInPolygon(point, polygon)) {
        return true;
      }
    }
  }
  return false;
}

export default class GeoData {
  static async getGeoForRegion(regionType, regionID) {
      const url = `data/geo/`
        + `${regionType}/${regionID}.json`
      return await WWW.json(url);
  }

  static async getRegionTree() {
      const url = `data/geo/`
        + `region_tree.json`
      return await WWW.json(url);
  }

  static async isPointInRegion(point, regionType, regionID) {
    const multiPolygon = await GeoData.getGeoForRegion(regionType, regionID);
    return isPointInMultiMultiPolygon(point, multiPolygon);
  }

  static async getRegionsForPoint(point, onRegionsUpdate) {
    let regionTree = await GeoData.getRegionTree();
    const regionTypes = ['province', 'district', 'dsd', 'gnd'];

    let regionMap = {};

    for (let iRegionType in regionTypes) {
      const regionType = regionTypes[iRegionType];
      const regionIDs = Object.keys(regionTree);
      let isFoundRegion = false;
      for (let iRegion in regionIDs) {
        const regionID = regionIDs[iRegion];
        const _isPointInRegion = await GeoData.isPointInRegion(
            point,
            regionType,
            regionID,
        );
        if (_isPointInRegion) {
          regionMap[regionType] = regionID;
          regionTree = regionTree[regionID];
          isFoundRegion = true;
          onRegionsUpdate(regionMap);
          break;
        }
      }
      if (!isFoundRegion) {
        return regionMap;
      }
    }
    return regionMap;
  }

}

export function roundLatLng(latLng) {
  const Q = 100;
  return latLng.map(x => Math.round(parseFloat(x) * Q) / Q);
}
