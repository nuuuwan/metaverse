import Ents, { ENT } from "../../../base/Ents.js";
import GIG2 from "../../../base/GIG2.js";
import StringX from "../../../base/StringX.js";
import { METADATA_MAP } from "../../../constants/GIG2Constants.js";
import TableView from "../../../nonstate/molecules/TableView.js";
import LegendView from "../../../nonstate/molecules/LegendView.js";

import AbstractLayer from "../AbstractLayer.js";
import RegionGeo from "../RegionGeo.js";

import "./GIG2Layer.css";

const MIN_OPACITY = 0.1;

export default class GIG2Layer extends AbstractLayer {
  static getTableName() {
    return "";
  }

  static getDisplayMode() {
    return "";
  }

  static getSource() {
    const tableName = this.getTableName();
    if (tableName.includes("census")) {
      return "https://www.statistics.gov.lk";
    }
    if (tableName.includes("election")) {
      return "https://www.elections.gov.lk";
    }
    return "";
  }

  static getMetadata() {
    return METADATA_MAP[this.getTableName()];
  }

  static getLabel() {
    const tableName = this.getTableName();
    const displayMode = this.getDisplayMode();
    const displayModeLabel =
      displayMode === "max" ? "Most Popular" : displayMode;
    const [timeID, attrID] = tableName.split(".").splice(1, 3);
    const timeIDWords = timeID.split("_");
    const timeStr = StringX.toTitleCase(timeIDWords.reverse().join(" "));
    const attrStr = StringX.toTitleCase(attrID);
    const displayModeStr = StringX.toTitleCase(displayModeLabel);

    return timeStr + attrStr + displayModeStr;
  }

  static renderLabel() {
    const tableName = this.getTableName();
    const displayMode = this.getDisplayMode();
    const displayModeLabel =
      displayMode === "max" ? "Most Popular" : displayMode;
    const [timeID, attrID] = tableName.split(".").splice(1, 3);
    const timeIDWords = timeID.split("_");
    const timeStr = StringX.toTitleCase(timeIDWords.reverse().join(" "));
    const attrStr = StringX.toTitleCase(attrID);
    const displayModeStr = StringX.toTitleCase(displayModeLabel);

    return (
      <div>
        <div className="div-label-attr">{timeStr + " - " + attrStr}</div>
        <div className="div-label-display-mode">{displayModeStr}</div>
      </div>
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

    const tableDataList = childIDs
      .map((childID) => tableIndex[childID])
      .filter((d) => d !== undefined);

    let valuePToRankP;
    if (displayMode !== "max") {
      const selectedValueKey = displayMode;
      valuePToRankP = GIG2.getValuePToRankP(tableDataList, selectedValueKey);
    }

    const dataList = childIDs
      .map(function (childID) {
        const tableRow = tableIndex[childID];
        if (!tableRow) {
          return undefined;
        }
        let color;
        let opacity;
        let valueP;
        if (displayMode === "max") {
          color = GIG2.getTableRowColor(tableRow);
          opacity = 0.9;
        } else {
          const selectedValueKey = displayMode;
          color = GIG2.getValueKeyColor(selectedValueKey);
          valueP = GIG2.getValueKeyP(tableRow, selectedValueKey);
          const rankP = valuePToRankP[valueP];
          opacity = rankP * (1 - MIN_OPACITY) + MIN_OPACITY;
        }

        return {
          regionID: childID,
          regionType: childRegionType,
          censusData: tableRow,
          color,
          opacity,
          valueP,
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
    const dataIndex = dataList.reduce(function (dataIndex, data) {
      dataIndex[data.regionID] = data;
      return dataIndex;
    }, {});
    const source = this.constructor.getSource();

    const renderCustom = function (regionID, iRegion) {
      const data = dataIndex[regionID];
      return <TableView data={data} source={source} />;
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

  renderLegend() {
    const { dataList } = this.state;
    return (
      <LegendView
        dataList={dataList}
        tableName={this.constructor.getTableName()}
        displayMode={this.constructor.getDisplayMode()}
      />
    );
  }
}
