import Ents, { ENT } from "../../../base/Ents.js";
import GIG2 from "../../../base/GIG2.js";
import StringX from "../../../base/StringX.js";
import { METADATA_MAP } from "../../../constants/GIG2Constants.js";
import TableView from "../../../nonstate/molecules/TableView.js";

import AbstractLayer from "../AbstractLayer.js";
import RegionGeo from "../RegionGeo.js";

import "./GIG2Layer.css";

export default class GIG2Layer extends AbstractLayer {
  static getTableName() {
    return "";
  }

  static getDisplayMode() {
    return "";
  }

  static getSource() {
    return "";
  }

  static getMetadata() {
    return METADATA_MAP[this.getTableName()];
  }

  static getLabel() {
    const [timeID, attrID] = this.getTableName().split(".").splice(1, 3);
    return StringX.toTitleCase(
      `${this.getDisplayMode()} - ${attrID} - ${timeID}`
    );
  }

  static getLayerClassID() {
    return this.getTableName();
  }

  static getRegionTypes() {
    const [spaceID] = this.getTableName().split(".").slice(0, 1);
    if (spaceID === "regions") {
      return [
        ENT.PROVINCE,
        ENT.DISTRICT,
        ENT.DSD,
        ENT.GND,
        ENT.ED,
        ENT.PD,
        ENT.MOH,
        ENT.LG,
      ];
    }
    if (spaceID === "regions_ec") {
      return [ENT.PROVINCE, ENT.ED, ENT.PD];
    }
    return [];
  }

  async getDataList() {
    const { childRegionType, parentRegionID } = this.props;
    const tableName = this.constructor.getTableName();
    const displayMode = this.constructor.getDisplayMode();
    const childIDs = await Ents.getChildIDs(parentRegionID, childRegionType);
    const tableIndex = await GIG2.getTableIndex(tableName);

    const dataList = childIDs
      .map(function (childID) {
        const tableRow = tableIndex[childID];
        if (!tableRow) {
          return undefined;
        }
        let color;
        let opacity;
        if (displayMode === "max") {
          color = GIG2.getTableRowColor(tableRow);
          opacity = 0.9;
        } else {
          const selectedValueKey = displayMode;
          color = GIG2.getValueKeyColor(selectedValueKey);
          const valueP = GIG2.getValueKeyP(tableRow, selectedValueKey);
          opacity = valueP * 0.99 + 0.01;
        }

        return {
          regionID: childID,
          regionType: childRegionType,
          censusData: tableRow,
          color,
          opacity,
        };
      })
      .filter((data) => data !== undefined && data.regionID.slice(-1) !== "P");
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

    const renderCustom = function (iRegion) {
      const data = dataList[iRegion];
      return <TableView data={data} />;
    };

    return dataList.map(
      function ({ regionType, regionID, color, opacity, censusData }, iRegion) {
        return (
          <RegionGeo
            key={`region-geo-${regionID}`}
            regionType={regionType}
            regionID={regionID}
            onClick={this.onClick.bind(this)}
            color={color}
            opacity={opacity}
            renderCustom={renderCustom}
            iRegion={iRegion}
          />
        );
      }.bind(this)
    );
  }
}
