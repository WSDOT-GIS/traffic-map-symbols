"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const GeoJSONLayer_1 = tslib_1.__importDefault(require("@arcgis/core/layers/GeoJSONLayer"));
const SimpleRenderer_1 = tslib_1.__importDefault(require("@arcgis/core/renderers/SimpleRenderer"));
const RestAreasSymbol_1 = tslib_1.__importDefault(require("@/symbols/RestAreasSymbol"));
const restAreasRenderer = new SimpleRenderer_1.default({
    symbol: RestAreasSymbol_1.default
});
/*const FeatureLayer = ()=>{
    const layer = new GeoJSONLayer({
        id: "rest-areas-layer",
        url: "https://data.wsdot.wa.gov/travelcenter/RestAreas.json",
        title: "Rest Areas",
        renderer: restAreasRenderer,
        //popupTemplate: weatherStationsPopup,
        visible: false
    })
    return layer
}*/
const FeatureLayer = new GeoJSONLayer_1.default({
    id: "rest-areas-layer",
    url: "https://data.wsdot.wa.gov/travelcenter/RestAreas.json",
    //url: await getURL(),
    title: "Rest Areas",
    renderer: restAreasRenderer,
    visible: false
});
exports.default = FeatureLayer;
//# sourceMappingURL=RestAreasLayer.js.map