import LKVaxCentersLayer from "./LKVaxCentersLayer.js";
import { CensusLayerFactory } from "./CensusLayer.js";

const censusLayerClasses = CensusLayerFactory.getAll();

export const CUSTOM_LAYERS = [].concat([LKVaxCentersLayer], censusLayerClasses);

export const CUSTOM_LAYERS_INDEX = CUSTOM_LAYERS.reduce(function (
  CUSTOM_LAYERS_INDEX,
  LayerClass
) {
  CUSTOM_LAYERS_INDEX[LayerClass.getLayerClassID()] = LayerClass;
  return CUSTOM_LAYERS_INDEX;
},
{});

export const DEFAULT_LAYER_CLASS_ID = CUSTOM_LAYERS[0].getLayerClassID();
