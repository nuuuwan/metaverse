import StringX from "./StringX.js";
import WWW from "./WWW.js";

export const ENT = {
  COUNTRY: "country",
  PROVINCE: "province",
  DISTRICT: "district",
  DSD: "dsd",
  GND: "gnd",
  PD: "pd",
  ED: "ed",
  UNKNOWN: "unknown-entity",
};

export const REGION_TYPES = Object.values(ENT);

export const ENT_TYPE_TO_LONG_NAME = {
  [ENT.Country]: "Country",
  [ENT.PROVINCE]: "Province",
  [ENT.DISTRICT]: "District",
  [ENT.DSD]: "Divisional Secretariat Division",
  [ENT.GND]: "Grama Niladhari Division",
  [ENT.PD]: "Polling Division",
  [ENT.ED]: "Electoral District",
};

export const PARENT_TO_CHILD = {
  [ENT.COUNTRY]: ENT.PROVINCE,
  [ENT.PROVINCE]: ENT.DISTRICT,
  [ENT.DISTRICT]: ENT.DSD,
  [ENT.DSD]: ENT.GND,
  [ENT.GND]: undefined,
  [ENT.PD]: undefined,
  [ENT.ED]: [ENT.PD],
};

export default class Ents {
  static getEntType(entID) {
    if (entID.substring(0, 2) === "LK") {
      const entIDLength = entID.length;
      switch (entIDLength) {
        case 2:
          return ENT.COUNTRY;
        case 4:
          return ENT.PROVINCE;
        case 5:
          return ENT.DISTRICT;
        case 7:
          return ENT.DSD;
        case 10:
          return ENT.GND;
        default:
          return ENT.UNKNOWN;
      }
    }
    if (entID.substring(0, 2) === "EC") {
      const entIDLength = entID.length;
      switch (entIDLength) {
        case 5:
          return ENT.ED;
        case 6:
          return ENT.PD;
        default:
          return ENT.UNKNOWN;
      }
    }
    return ENT.UNKNOWN;
  }
  static getRegionName(regionType) {
    return ENT_TYPE_TO_LONG_NAME[regionType];
  }
  static async getEntsByType(entType) {
    const url = `/metaverse/data/ents/${entType}.tsv`;
    return await WWW.tsv(url);
  }

  static async getEntIndexByType(entType) {
    const ents = await Ents.getEntsByType(entType);
    return ents.reduce(function (entIndex, ent) {
      entIndex[ent.id] = ent;
      return entIndex;
    }, {});
  }

  static async getAllEntIndex() {
    const entTypes = REGION_TYPES;
    const entIndexList = await Promise.all(
      entTypes.map(async function (entType) {
        return await Ents.getEntIndexByType(entType);
      })
    );

    return entTypes.reduce(function (allEntIndex, entType, iEnt) {
      allEntIndex[entType] = entIndexList[iEnt];
      return allEntIndex;
    }, {});
  }

  static async getEnt(entID) {
    const entType = Ents.getEntType(entID);
    const entIndex = await Ents.getEntIndexByType(entType);
    let ent = entIndex[entID];
    if (ent["centroid"]) {
      ent["centroid"] = JSON.parse(ent["centroid"]);
    }
    return ent;
  }

  static async getParentToChildMap() {
    const url = `data/ents/parent_to_child_map.json`;
    return await WWW.json(url);
  }

  static async getChildIDs(parentID, childRegionType) {
    const ents = await Ents.getEntsByType(childRegionType);
    return ents
      .map((ent) => ent.id)
      .filter((entID) => entID.includes(parentID) || parentID === "LK");
  }

  static getEntTypeLongName(entType) {
    return ENT_TYPE_TO_LONG_NAME[entType]
      ? ENT_TYPE_TO_LONG_NAME[entType]
      : StringX.toTitleCase(entType);
  }
}
