import AbstractLayer from "../AbstractLayer.js";
import RegionGeo from "../RegionGeo.js";

class AdminRegionLayer extends AbstractLayer {
  async getDataList() {
    const regionType = this.getRegionType();
    const { regions } = this.props;
    if (!regions || !regions[regionType]) {
      return [];
    }
    const regionID = regions[regionType];
    return [{ regionType, regionID }];
  }

  renderDataList() {
    const { dataList } = this.state;

    return dataList.map(function ({ regionType, regionID }, iData) {
      return (
        <RegionGeo regionType={regionType} regionID={regionID}></RegionGeo>
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
