"use strict";
//A set of functions to deal with the display of graphics that aren't intended to persist in the map.
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeGraphicsByType = exports.hidePointInteractionGraphics = exports.displayPointInteractionGraphics = exports.addGraphicsByType = void 0;
const tslib_1 = require("tslib");
const Point_1 = tslib_1.__importDefault(require("@arcgis/core/geometry/Point"));
const Graphic_1 = tslib_1.__importDefault(require("@arcgis/core/Graphic"));
const esriMap_1 = require("../esri-stuff/esriMap");
const MyLocationSymbol_1 = require("@/symbols/MyLocationSymbol");
const featureInfoUtil_1 = require("./featureInfoUtil");
const addGraphicsByType = (type, featureGeometry) => {
    let graphic;
    switch (type) {
        case "myLocation":
            graphic = new Graphic_1.default({
                geometry: new Point_1.default({
                    longitude: featureGeometry.longitude,
                    latitude: featureGeometry.latitude,
                }),
                attributes: {
                    graphicType: "myLocation"
                },
                symbol: MyLocationSymbol_1.MyLocationSymbol
            });
            break;
    }
    //mapView.graphics.add(pointGraphic);
    esriMap_1.mapView.graphics.add(graphic);
};
exports.addGraphicsByType = addGraphicsByType;
const displayPointInteractionGraphics = (layer, targetField, targetValue) => {
    layer.definitionExpression = `${targetField} = '${targetValue}'`;
    featureInfoUtil_1.getLineFromPointId(targetField, targetValue, layer); /*.then((lines) => {// zoom to the graphic after it displays
        mapView
        .goTo(lines.features[0].geometry)
    });*/
};
exports.displayPointInteractionGraphics = displayPointInteractionGraphics;
const hidePointInteractionGraphics = (layer) => {
    const targetLayer = layer;
    if (targetLayer) {
        targetLayer.definitionExpression = "1=0"; //remove line restriction symbol
    }
};
exports.hidePointInteractionGraphics = hidePointInteractionGraphics;
const removeGraphicsByType = (graphicType) => {
    switch (graphicType) {
        default: {
            const collection = esriMap_1.mapView.graphics;
            const graphicsArray = collection.toArray();
            for (let i = 0; i < graphicsArray.length; i++) {
                if (graphicsArray[i].attributes.graphicType == graphicType) {
                    esriMap_1.mapView.graphics.remove(graphicsArray[i]);
                }
            }
        }
    }
};
exports.removeGraphicsByType = removeGraphicsByType;
//# sourceMappingURL=graphicLayerUtil.js.map