import Ents, { ENT, PARENT_TO_CHILD } from "../../../base/Ents.js";
import Census from "../../../base/Census.js";
import AbstractLayer from "../AbstractLayer.js";
import RegionGeo from "../RegionGeo.js";

export default class CensusLayer extends AbstractLayer {
  constructor(props) {
    super(props);
    this.state = {
      rootRegionID: "LK",
      rootRegionType: ENT.COUNTRY,
      tableName: 'religious_affiliation_of_population',
   };
  }

  static getLabel() {
    return "2012 Census";
  }

  static isMatch(text) {
    return CensusLayer.getLabel().toLowerCase().includes(text.toLowerCase());
  }

  async getDataList() {
    const { rootRegionID, rootRegionType , tableName} = this.state;
    const childRegionType = PARENT_TO_CHILD[rootRegionType];
    const childIDs = await Ents.getChildIDs(rootRegionID);

    const tableIndex = await Census.getTableIndex(tableName);
    console.debug(tableIndex);

    const dataList = childIDs.map(
      function(childID) {
        const tableRow = tableIndex[childID];
        const color = Census.getTableRowColor(tableRow);
        return {
          regionID: childID,
          regionType: childRegionType,
          censusData: tableRow,
          color: color,
        }
      }
    )
    console.debug(dataList);
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
      function ({ regionType, regionID, color }) {
        return (
          <RegionGeo
            key={`region-geo-${regionID}`}
            regionType={regionType}
            regionID={regionID}
            onClick={this.onClick.bind(this)}
            color={color}
          />
        );
      }.bind(this)
    );
  }
}
