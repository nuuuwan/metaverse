import AbstractLayer from "../AbstractLayer.js";
import RegionGeo from "../RegionGeo.js";

class AdminRegionLayer extends AbstractLayer {
  renderDataList() {
    const { center, regions } = this.props;

    const regionType = this.getRegionType();
    let dataList = [];
    if (regions) {
      const regionID = regions[regionType];
      if (regionID) {
        dataList = [{ regionType, regionID }];
      }
    }

    return dataList.map(function ({ regionType, regionID }, iData) {
      return (
        <RegionGeo
          key={`region-geo-${regionID}`}
          regionType={regionType}
          regionID={regionID}
        />
      );
    });
  }
}

export class GNDRegionLayer extends AdminRegionLayer {
  static getLabel() {
    return "Grama Niladhari Divisions";
  }

  static isMatch(text) {
    return GNDRegionLayer.getLabel().toLowerCase().includes(text.toLowerCase());
  }

  getRegionType() {
    return "gnd";
  }
}

export class DSDRegionLayer extends AdminRegionLayer {
  static getLabel() {
    return "Divisional Secretariat Divisions";
  }

  static isMatch(text) {
    return DSDRegionLayer.getLabel().toLowerCase().includes(text.toLowerCase());
  }

  getRegionType() {
    return "dsd";
  }
}
