import AbstractLayer from "../AbstractLayer.js";
import RegionGeo from "../RegionGeo.js";

export default class AdminRegionLayer extends AbstractLayer {
  static getLabel() {
    return "Administrative Regions";
  }

  static isMatch(text) {
    return AdminRegionLayer.getLabel()
      .toLowerCase()
      .includes(text.toLowerCase());
  }

  async getDataList() {
    const { regions } = this.props;
    if (!regions) {
      return [];
    }
    return Object.entries(regions).map(([regionType, regionID]) => ({
      regionType,
      regionID,
    }));
  }

  renderDataList() {
    const { dataList } = this.state;

    return dataList.map(function ({ regionType, regionID }, iData) {
      return <RegionGeo regionType={regionType} regionID={regionID} />;
    });
  }
}
