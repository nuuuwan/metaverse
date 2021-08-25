import { FIELD_NAME_TO_COLOR } from "../constants/ColorConstants.js";
import WWW from "./WWW.js";
import Color from "./Color.js";

export const TABLE_NAMES = [
  "housing_ownership_status_of_household",
  "lighting_of_household",
  "toilet_facilities_of_household",
  "communication_items_owned_by_household",
  "solid_waste_disposal_by_household",
  "ethnicity_of_population",
  "total_population",
  "relationship_to_household_head_of_population",
  "religious_affiliation_of_population",
  "marital_status_of_population",
  "gender_of_population",
  "living_quarters",
  "age_group_of_population",
  "type_of_housing_unit",
  "occupation_status_of_housing_units",
  "wall_type_in_housing_units",
  "structure_of_housing_units",
  "roof_type_in_housing_unit",
  "floor_type_in_housing_unit",
  "households_living_in_housing_unit",
  "persons_living_in_housing_unit",
  "year_of_construction_of_housing_unit",
  "rooms_in_housing_unit",
  "cooking_fuel_of_household",
  "source_of_drinking_water_of_household",
];

let adhocValueKeyToColor = {};

export default class Census {
  static async getMetaData() {
    const url = `/metaverse/data/census/meta.json`;
    return await WWW.json(url);
  }

  static async getTable(tableName) {
    const url = `/metaverse/data/census/data.${tableName}.tsv`;
    return await WWW.tsv(url);
  }

  static async getTableIndex(tableName) {
    const table = await Census.getTable(tableName);
    const valueKeys = Census.filterValueCellKeys(table[0]);
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
      (cellKey) => !(cellKey.includes("total_") || cellKey === "entity_id")
    );
  }

  static getMaxValueKey(tableRow) {
    const valueKeys = Census.filterValueCellKeys(tableRow);
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
    const maxValueKey = Census.getMaxValueKey(tableRow);
    return Census.getValueKeyColor(maxValueKey);
  }
}
