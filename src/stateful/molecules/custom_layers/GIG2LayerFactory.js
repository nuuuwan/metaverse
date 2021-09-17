import { ENT } from "../../../base/Ents.js";
import {TABLE_NAMES} from "../../../constants/GIG2Constants.js";
import GIG2Layer from "./GIG2Layer.js";

export default class GIG2LayerFactory {
  static build(tableName) {
    const GIG2Class = class extends GIG2Layer {
      static getTableName() {
        return tableName;
      }
    };
    return GIG2Class;
  }

  static getAll() {
    return TABLE_NAMES.map((tableName) => GIG2LayerFactory.build(tableName));
  }
}
