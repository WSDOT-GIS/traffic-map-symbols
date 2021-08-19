"use strict";
/*
URL query parameters:
* extent
    Comma separated list of xmin, xmax, ymin, ymax in DD format.
    The sequence does not matter.
* layer
    Comma separated list of layer indices
* base
    Name of the basemap
Sample URLs
Zoom to Seattle metro area and turn off traffic layer, turn on Park & Rides and Traffic Camera layers, satellite basemap
?extent=-122.4489756,47.7741882,-122.1102255,47.5032113&layer=1,2&base=satellite
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBasemapFromUrl = exports.getExtentFromUrl = exports.setLayerFromUrl = void 0;
const tslib_1 = require("tslib");
const projection_1 = require("@arcgis/core/geometry/projection");
const SpatialReference_1 = tslib_1.__importDefault(require("@arcgis/core/geometry/SpatialReference"));
const Extent_1 = tslib_1.__importDefault(require("@arcgis/core/geometry/Extent"));
const extentUtil_1 = require("./extentUtil");
const Basemaps_1 = require("@/layers/Basemaps");
// Read the URL query parameters...
const params = new URLSearchParams(window.location.search);
// Assign layer visibility if it is specified...
const setLayerFromUrl = (layerList) => {
    const layerParam = params.get("layer");
    if (layerParam) {
        const visibleLayers = layerParam.split(',').map(x => parseInt(x, 10));
        layerList.forEach((eachLyr) => {
            eachLyr.visible = visibleLayers.includes(eachLyr.index);
        });
    }
};
exports.setLayerFromUrl = setLayerFromUrl;
// Assign extent if it is specified.
// If not specified or value is not valid, return full state.
const getExtentFromUrl = () => {
    const extentParam = params.get("extent");
    let extent;
    if (extentParam) {
        const extentNums = extentParam.split(',').map(x => parseFloat(x)).sort((a, b) => { return a - b; });
        if (extentNums.length == 4) {
            let isValid = true;
            for (let i = 0; i < 4; i++) {
                // Check to make sure lat, long values are within reasonable range...
                if (i < 2 && (extentNums[i] < -126 || extentNums[i] > -116)) {
                    isValid = false;
                    break;
                }
                else if (i > 1 && (extentNums[i] < 45 || extentNums[i] > 50)) {
                    isValid = false;
                    break;
                }
            }
            if (isValid) {
                const extentWgs = new Extent_1.default({
                    xmin: extentNums[0],
                    xmax: extentNums[1],
                    ymin: extentNums[2],
                    ymax: extentNums[3],
                    spatialReference: SpatialReference_1.default.WGS84
                });
                extent = projection_1.project(extentWgs, SpatialReference_1.default.WebMercator);
            }
        }
    }
    if (extent === undefined) {
        extent = extentUtil_1.getEsriExtent("full");
    }
    return extent;
};
exports.getExtentFromUrl = getExtentFromUrl;
const getBasemapFromUrl = () => {
    const param = params.get("base");
    const name = param ? param : "";
    const basemapInfo = Basemaps_1.getBasemapInfo(name);
    return basemapInfo;
};
exports.getBasemapFromUrl = getBasemapFromUrl;
//# sourceMappingURL=urlParamUtil.js.map