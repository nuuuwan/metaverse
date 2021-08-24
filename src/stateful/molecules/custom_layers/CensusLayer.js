import Ents, { ENT, PARENT_TO_CHILD } from "../../../base/Ents.js";
import AbstractLayer from "../AbstractLayer.js";
import RegionGeo from "../RegionGeo.js";

export default class CensusLayer extends AbstractLayer {
  constructor(props) {
    super(props);
    this.state = { rootRegionID: "LK", rootRegionType: ENT.COUNTRY };
  }

  static getLabel() {
    return "Administrative Regions";
  }

  static isMatch(text) {
    return CensusLayer.getLabel().toLowerCase().includes(text.toLowerCase());
  }

  async getDataList() {
    const { rootRegionID, rootRegionType } = this.state;
    const childRegionType = PARENT_TO_CHILD[rootRegionType];
    const childIDs = await Ents.getChildIDs(rootRegionID);
    const dataList = childIDs.map((childID) => ({
      regionType: childRegionType,
      regionID: childID,
    }));
    return dataList;
  }

  onClick(regionType, regionID) {
    this.setState(
      {
        rootRegionID: regionID,
        rootRegionType: regionType,
      },
      async function () {
        const dataList = await this.getDataList();
        this.setState({ dataList });
      }.bind(this)
    );
  }

  renderDataList() {
    const { dataList } = this.state;
    return dataList.map(
      function ({ regionType, regionID }) {
        return (
          <RegionGeo
            key={`region-geo-${regionID}`}
            regionType={regionType}
            regionID={regionID}
            onClick={this.onClick.bind(this)}
          />
        );
      }.bind(this)
    );
  }
}
