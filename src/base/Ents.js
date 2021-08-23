import WWW from "./WWW.js";

export const ENT = {
  PROVINCE: "province",
  DISTRICT: "district",
  DSD: "dsd",
  GND: "gnd",
};

export const REGION_TYPES = Object.values(ENT);

export const ENT_TO_NAME = {
  [ENT.PROVINCE]: "Province",
  [ENT.DISTRICT]: "District",
  [ENT.DSD]: "Divisional Secretariat Division",
  [ENT.GND]: "Grama Niladhari Division",
};

export default class Ents {
  static async getEntsByType(entType) {
    const url = `data/ents/${entType}.tsv`;
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

  static async getEnt(entType, entID) {
    const entIndex = await Ents.getEntIndexByType(entType);
    let ent = entIndex[entID];
    if (ent["centroid"]) {
      ent["centroid"] = JSON.parse(ent["centroid"]);
    }
    return ent;
  }
}
