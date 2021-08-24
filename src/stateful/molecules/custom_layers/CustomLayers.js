import LKVaxCentersLayer from "./LKVaxCentersLayer.js";
import AdminRegionLayer from "./AdminRegionLayer.js";
import { CensusLayerFactory } from "./CensusLayer.js";

const censusLayerClasses = CensusLayerFactory.getAll();

export const CUSTOM_LAYERS = [].concat(
  [censusLayerClasses[5]],
  censusLayerClasses,
  [LKVaxCentersLayer, AdminRegionLayer]
);

export const POPULAR_CUSTOM_LAYERS = [LKVaxCentersLayer, censusLayerClasses[5]];
