"use strict";
//A set of functions to deal with the display of graphics that aren't intended to persist in the map.
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeGraphicsByType = exports.hidePointInteractionGraphics = exports.displayPointInteractionGraphics = exports.addGraphicsByType = exports.buildGraphicsByType = void 0;
const tslib_1 = require("tslib");
const Point_1 = tslib_1.__importDefault(require("@arcgis/core/geometry/Point"));
const Graphic_1 = tslib_1.__importDefault(require("@arcgis/core/Graphic"));
const esriMap_1 = require("../esri-stuff/esriMap");
const MyLocationSymbol_1 = require("@/symbols/MyLocationSymbol");
const featureInfoUtil_1 = require("./featureInfoUtil");
const CIMSymbol_1 = tslib_1.__importDefault(require("@arcgis/core/symbols/CIMSymbol"));
const buildGraphicsByType = (type, data) => {
    let graphic;
    let selectedSymbol;
    let layer;
    let jsonSymbol;
    let newSymbol;
    switch (type) {
        case "coordinates":
            graphic = new Graphic_1.default({
                geometry: new Point_1.default({
                    longitude: data.longitude,
                    latitude: data.latitude,
                }),
                symbol: MyLocationSymbol_1.MyLocationSymbol
            });
            break;
        case "CIMSymbol":
            layer = data.layer;
            selectedSymbol = new CIMSymbol_1.default();
            if (layer.renderer.type == "unique-value") {
                const renderer = layer.renderer;
                const field = renderer.field;
                renderer.uniqueValueInfos.forEach(uniqueValueInfo => {
                    if (uniqueValueInfo.value == data.attributes[field]) {
                        selectedSymbol = uniqueValueInfo.symbol;
                    }
                });
            }
            if (layer.renderer.type == "simple") {
                const renderer = layer.renderer;
                selectedSymbol = renderer.symbol;
            }
            // console.log(selectedSymbol)
            jsonSymbol = selectedSymbol.toJSON();
            jsonSymbol.symbol.symbolLayers[0].size = 30;
            jsonSymbol.symbol.symbolLayers[0].offsetY = 15;
            newSymbol = CIMSymbol_1.default.fromJSON(jsonSymbol);
            // console.log(data)
            graphic = new Graphic_1.default({
                geometry: data.geometry,
                symbol: newSymbol
            });
            // console.log(graphic)
            break;
    }
    return graphic;
};
exports.buildGraphicsByType = buildGraphicsByType;
const addGraphicsByType = (graphicType, graphic) => {
    // console.log(graphic)
    graphic.attributes = { graphicType: graphicType };
    esriMap_1.mapView.graphics.add(graphic);
};
exports.addGraphicsByType = addGraphicsByType;
const displayPointInteractionGraphics = (layer, targetField, targetValue) => {
    layer.visible = true;
    layer.definitionExpression = `${targetField} = '${targetValue}'`;
    featureInfoUtil_1.getLineFromPointId(targetField, targetValue, layer); /*.then((lines) => {// zoom to the graphic after it displays
        mapView
        .goTo(lines.features[0].geometry)
    });*/
};
exports.displayPointInteractionGraphics = displayPointInteractionGraphics;
const hidePointInteractionGraphics = (layer) => {
    const targetLayer = layer;
    targetLayer.visible = false;
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