import Ents from "../../../base/Ents.js";
import MathX from "../../../base/MathX.js";
import StringX from "../../../base/StringX.js";
import Census, { TABLE_NAMES } from "../../../base/Census.js";

import AbstractLayer from "../AbstractLayer.js";
import RegionGeo from "../RegionGeo.js";

import "./CensusLayer.css";

export default class CensusLayer extends AbstractLayer {
  static getTableName() {
    return "";
  }

  static getLabel() {
    return "";
  }

  static getSource() {
    return "http://www.statistics.gov.lk/";
  }

  static isMatch(text) {
    return false;
  }

  static hasRegions() {
    return true;
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

    const renderCustom = function (iRegion) {
      const data = dataList[iRegion];
      const tableRow = data.censusData;
      const valueCellKeys = Census.filterValueCellKeys(tableRow);
      const values = valueCellKeys.map(
        (valueCellKey) => tableRow[valueCellKey]
      );
      const sumValues = MathX.sum(values);

      const sortedValueCellEntries = valueCellKeys
        .map((valueCellKey) => [valueCellKey, tableRow[valueCellKey]])
        .sort((a, b) => b[1] - a[1]);
      return (
        <table>
          <tbody>
            {sortedValueCellEntries.map(function (
              [valueCellKey, valueCellValue],
              iValueCellKey
            ) {
              const tdColorStyle = {
                background: Census.getValueKeyColor(valueCellKey),
              };
              return (
                <tr key={`${iValueCellKey}-${valueCellKey}`}>
                  <td className="td-color" style={tdColorStyle}></td>
                  <th>{StringX.toTitleCase(valueCellKey)}</th>
                  <td className="td-number">
                    {StringX.formatInt(valueCellValue)}
                  </td>
                  <td className="td-number">
                    {StringX.formatPercent(valueCellValue, sumValues)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    };

    return dataList.map(
      function ({ regionType, regionID, color, censusData }, iRegion) {
        return (
          <RegionGeo
            key={`region-geo-${regionID}`}
            regionType={regionType}
            regionID={regionID}
            onClick={this.onClick.bind(this)}
            color={color}
            renderCustom={renderCustom}
            iRegion={iRegion}
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
        return StringX.toTitleCase(tableName.replaceAll("_", " "));
      }

      static getLayerClassID() {
          return this.getTableName();
      }

    };
    return CensusClass;
  }

  static getAll() {
    return TABLE_NAMES.map((tableName) => CensusLayerFactory.build(tableName));
  }
}
