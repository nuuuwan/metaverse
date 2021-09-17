import { TABLE_NAMES, METADATA_MAP } from "../../../constants/GIG2Constants.js";
import GIG2Layer from "./GIG2Layer.js";

const DEFAULT_DISPLAY_MODES = ["max"];

export default class GIG2LayerFactory {
  static build(tableName, displayMode) {
    const GIG2Class = class extends GIG2Layer {
      static getTableName() {
        return tableName;
      }

      static getDisplayMode() {
        return displayMode;
      }
    };
    return GIG2Class;
  }

  static getAll() {
    return TABLE_NAMES.reduce(function (GIG2ClassList, tableName) {
      const metadata = METADATA_MAP[tableName];
      const valueKeyList = metadata.value_key_list_str.split(";");
      return []
        .concat(DEFAULT_DISPLAY_MODES, valueKeyList)
        .reduce(function (GIG2ClassList, displayMode) {
          const GIG2Class = GIG2LayerFactory.build(tableName, displayMode);
          GIG2ClassList.push(GIG2Class);
          return GIG2ClassList;
        }, GIG2ClassList);
    }, []);
  }
}
