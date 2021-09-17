import { FIELD_NAME_TO_COLOR } from "../constants/ColorConstants.js";
import WWW from "./WWW.js";
import Color from "./Color.js";

let adhocValueKeyToColor = {};

export const TABLE_NAMES = [
  // "country.latest.basic",
  // "district.latest.basic",
  // "dsd.latest.basic",
  // "ed.latest.basic",
  // "gnd.latest.basic",
  // "lg.latest.basic",
  // "moh.latest.basic",
  "pd.1982_election_presidential.result",
  "pd.1988_election_presidential.result",
  "pd.1994_election_presidential.result",
  "pd.1999_election_presidential.result",
  "pd.2005_election_presidential.result",
  "pd.2010_election_presidential.result",
  "pd.2015_election_presidential.result",
  "pd.2019_election_presidential.result",
  // "pd.latest.basic",
  // "province.latest.basic",
  "regions.2012_census.age_group_of_population",
  "regions.2012_census.communication_items_owned_by_household",
  "regions.2012_census.cooking_fuel_of_household",
  "regions.2012_census.ethnicity_of_population",
  "regions.2012_census.floor_type_in_housing_unit",
  "regions.2012_census.gender_of_population",
  "regions.2012_census.households_living_in_housing_unit",
  "regions.2012_census.housing_ownership_status_of_household",
  "regions.2012_census.lighting_of_household",
  "regions.2012_census.living_quarters",
  "regions.2012_census.marital_status_of_population",
  "regions.2012_census.occupation_status_of_housing_units",
  "regions.2012_census.persons_living_in_housing_unit",
  "regions.2012_census.relationship_to_household_head_of_population",
  "regions.2012_census.religious_affiliation_of_population",
  "regions.2012_census.roof_type_in_housing_unit",
  "regions.2012_census.rooms_in_housing_unit",
  "regions.2012_census.solid_waste_disposal_by_household",
  "regions.2012_census.source_of_drinking_water_of_household",
  "regions.2012_census.structure_of_housing_units",
  "regions.2012_census.toilet_facilities_of_household",
  "regions.2012_census.total_population",
  "regions.2012_census.type_of_housing_unit",
  "regions.2012_census.wall_type_in_housing_units",
  "regions.2012_census.year_of_construction_of_housing_unit",
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
    const [spaceID] = tableName.split(".").slice(0, 1);

    let idFieldKey;
    if (spaceID === "regions") {
      idFieldKey = "entity_id";
    } else {
      idFieldKey = `${spaceID}_id`;
    }
    const table = await GIG2.getTable(tableName);
    const valueKeys = GIG2.filterValueCellKeys(table[0]);
    return table.reduce(function (tableIndex, tableRow) {
      tableIndex[tableRow[idFieldKey]] = Object.entries(tableRow).reduce(
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
