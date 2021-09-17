import StringX from "../../../base/StringX.js";
import { TABLE_NAMES } from "../../../base/GIG2.js";
import { ENT } from "../../../base/Ents.js";
import GIG2Layer from "./GIG2Layer.js";

export default class GIG2LayerFactory {
  static build(tableName) {
    const GIG2Class = class extends GIG2Layer {
      static getTableName() {
        return tableName;
      }

      static getLabel() {
        return StringX.toTitleCase(
          tableName.replaceAll(".", " ").replaceAll("_", " ")
        );
      }

      static getLayerClassID() {
        return this.getTableName();
      }

      static getRegionTypes() {
        const [spaceID] = tableName.split(".").slice(0, 1);
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
        if (spaceID === "pd") {
          return [ENT.PD];
        }
        return [];
      }
    };
    return GIG2Class;
  }

  static getAll() {
    return TABLE_NAMES.map((tableName) => GIG2LayerFactory.build(tableName));
  }
}
