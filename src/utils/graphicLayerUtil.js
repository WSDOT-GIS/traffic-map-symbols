"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeGraphicsByType = exports.displayGraphicsByType = void 0;
const tslib_1 = require("tslib");
const Point_1 = tslib_1.__importDefault(require("@arcgis/core/geometry/Point"));
const Graphic_1 = tslib_1.__importDefault(require("@arcgis/core/Graphic"));
const esriMap_1 = require("../esri-stuff/esriMap");
const MyLocationSymbol_1 = require("@/symbols/MyLocationSymbol");
const displayGraphicsByType = (graphicType, featureGeometry) => {
    let graphic;
    switch (graphicType) {
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
        case "pointInteractionLine":
            break;
    }
    //mapView.graphics.add(pointGraphic);
    esriMap_1.mapView.graphics.add(graphic);
};
exports.displayGraphicsByType = displayGraphicsByType;
const removeGraphicsByType = (graphicType, layer) => {
    switch (graphicType) {
        case "pointInteractionLine": {
            const targetLayer = layer;
            if (targetLayer) {
                targetLayer.definitionExpression = "1=0"; //remove line restriction symbol
            }
            break;
        }
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