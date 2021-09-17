import { FIELD_NAME_TO_COLOR } from "../constants/ColorConstants.js";
import WWW from "./WWW.js";
import Color from "./Color.js";
import MathX from "./MathX.js";

let adhocValueKeyToColor = {};

const ID_FIELD_KEY = "entity_id";

export default class GIG2 {
  static async getMetaData() {
    return await WWW.tsv("/metaverse/data/gig2/_metadata.tsv");
  }

  static async getTable(tableName) {
    const url = `/metaverse/data/gig2/${tableName}.tsv`;
    return await WWW.tsv(url);
  }

  static async getTableIndex(tableName) {
    const table = await GIG2.getTable(tableName);
    const valueKeys = GIG2.filterValueCellKeys(table[0]);
    return table.reduce(function (tableIndex, tableRow) {
      tableIndex[tableRow[ID_FIELD_KEY]] = Object.entries(tableRow).reduce(
        function (cleanTableRow, [key, value]) {
          if (valueKeys.includes(key)) {
            value = parseFloat(value);
          }
          cleanTableRow[key] = value;
          return cleanTableRow;
        },
        {}
      );
      return tableIndex;
    }, {});
  }

  static filterValueCellKeys(tableRow) {
    const valueCellKeys = Object.keys(tableRow).filter(
      (cellKey) =>
        !(
          cellKey.includes("total_") ||
          cellKey.includes("_id") ||
          cellKey.includes("result_ut") ||
          cellKey.includes("valid") ||
          cellKey.includes("rejected") ||
          cellKey.includes("polled") ||
          cellKey.includes("electors")
        )
    );
    return valueCellKeys;
  }

  static getMaxValueKey(tableRow) {
    const valueKeys = GIG2.filterValueCellKeys(tableRow);
    const maxValueKey = valueKeys.reduce(function (maxValueKey, valueKey) {
      if (tableRow[maxValueKey] < tableRow[valueKey]) {
        maxValueKey = valueKey;
      }
      return maxValueKey;
    }, valueKeys[0]);
    return maxValueKey;
  }

  static getMaxValueP(dataList, valueKey) {
    return dataList.reduce(function (maxValueP, tableRow) {
      const sumValue = GIG2.getSumValues(tableRow);
      const value = tableRow[valueKey];
      const valueP = value / sumValue;
      return Math.max(maxValueP, valueP);
    }, 0);
  }

  static getSumValues(tableRow) {
    const valueKeys = GIG2.filterValueCellKeys(tableRow);
    return MathX.sum(valueKeys.map((valueKey) => tableRow[valueKey]));
  }

  static getValueKeyP(tableRow, valueKey) {
    const sumValues = GIG2.getSumValues(tableRow);
    return tableRow[valueKey] / sumValues;
  }

  static getValueKeyColor(valueKey) {
    if (FIELD_NAME_TO_COLOR[valueKey]) {
      return FIELD_NAME_TO_COLOR[valueKey];
    }
    if (!adhocValueKeyToColor[valueKey]) {
      adhocValueKeyToColor[valueKey] = Color.getRandomHSLA();
    }
    return adhocValueKeyToColor[valueKey];
  }

  static getTableRowColor(tableRow) {
    const maxValueKey = GIG2.getMaxValueKey(tableRow);
    return GIG2.getValueKeyColor(maxValueKey);
  }
}
