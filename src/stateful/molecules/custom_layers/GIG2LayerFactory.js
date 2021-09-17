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
    };
    return GIG2Class;
  }

  static getAll() {
    return TABLE_NAMES.map((tableName) => GIG2LayerFactory.build(tableName));
  }
}
