import Ents from "../../../base/Ents.js";
import StringX from "../../../base/StringX.js";
import Census, { TABLE_NAMES } from "../../../base/Census.js";
import AbstractLayer from "../AbstractLayer.js";
import RegionGeo from "../RegionGeo.js";

export default class CensusLayer extends AbstractLayer {
  static getTableName() {
    return "";
  }

  static getLabel() {
    return "";
  }

  static isMatch(text) {
    return false;
  }

  async getDataList() {
    const { childRegionType, parentRegionID } = this.props;
    const tableName = this.constructor.getTableName();
    const childIDs = await Ents.getChildIDs(parentRegionID, childRegionType);

    const tableIndex = await Census.getTableIndex(tableName);

    const dataList = childIDs.map(function (childID) {
      const tableRow = tableIndex[childID];
      const color = Census.getTableRowColor(tableRow);
      return {
        regionID: childID,
        regionType: childRegionType,
        censusData: tableRow,
        color: color,
      };
    });
    return dataList;
  }

  onClick(regionType, regionID) {
    this.setState(
      {
        parentRegionID: regionID,
        parentRegionType: regionType,
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

export class CensusLayerFactory {
  static build(tableName) {
    const CensusClass = class extends CensusLayer {
      static getTableName() {
        return tableName;
      }

      static getLabel() {
        return StringX.toTitleCase(
          tableName
            .replaceAll("_", " ")
        );
      }

      static isMatch(text) {
        return this.getLabel().toLowerCase().includes(text.toLowerCase());
      }
    };
    return CensusClass;
  }

  static getAll() {
    return TABLE_NAMES.map((tableName) => CensusLayerFactory.build(tableName));
  }
}
