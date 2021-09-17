import LKVaxCentersLayer from "./LKVaxCentersLayer.js";
import GIG2LayerFactory from "./GIG2LayerFactory.js";

const gig2LayerClasses = GIG2LayerFactory.getAll();

export const CUSTOM_LAYERS = [].concat([LKVaxCentersLayer], gig2LayerClasses);

export const CUSTOM_LAYERS_INDEX = CUSTOM_LAYERS.reduce(function (
  CUSTOM_LAYERS_INDEX,
  LayerClass
) {
  CUSTOM_LAYERS_INDEX[LayerClass.getLayerClassID()] = LayerClass;
  return CUSTOM_LAYERS_INDEX;
},
{});

export const DEFAULT_LAYER_CLASS_ID = CUSTOM_LAYERS[0].getLayerClassID();
