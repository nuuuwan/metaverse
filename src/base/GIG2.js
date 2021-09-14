import { FIELD_NAME_TO_COLOR } from "../constants/ColorConstants.js";
import WWW from "./WWW.js";
import Color from "./Color.js";

let adhocValueKeyToColor = {};

export const TABLE_NAMES = [
  "regions.2012_census.religious_affiliation_of_population",
];

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
    console.debug(table);
    const valueKeys = GIG2.filterValueCellKeys(table[0]);
    return table.reduce(function (tableIndex, tableRow) {
      tableIndex[tableRow.entity_id] = Object.entries(tableRow).reduce(
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
    return Object.keys(tableRow).filter(
      (cellKey) => !(cellKey.includes("total_") || cellKey.includes("_id"))
    );
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
