import WWW from "./WWW.js";

export const REGION_TYPES = ["province", "district", "dsd", "gnd"];

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
}
