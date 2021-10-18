"use strict";
/*
URL query parameters:
* extent
    Comma separated list of xmin, xmax, ymin, ymax in DD format.
    The sequence does not matter.
* base
    Name of the basemap
* layer
    Layers to turn on
* featuretype
    Type of feature to turn on. Single type might turn on multiple layers e.g. restriction => point and line layers
    Types: camera, alert, restriction
* featureid
    Feature ID - if specified in combination with the type parameter, map should zoom to that feature and open popup.
    If the type parameter is not specified, this is ignored.
Sample URLs:
* Zoom to Seattle metro area and turn on Park & Rides and Traffic Camera layers, satellite basemap
?extent=-122.4489756,47.7741882,-122.1102255,47.5032113&layer=camera,parkride&base=satellite
* Open camera popup with ID
?featuretype=camera&featureid=1001
?featuretype=restriction&featureid=R-WA-290-2
?featuretype=alert&featureid=464389
?featuretype=weather&featureid=1909
?featuretype=mountain&featureid=2
?featuretype=time&featureid=4
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBasemapFromUrl = exports.getExtentFromUrl = exports.getFeatureTypeFromUrl = exports.getFeatureIdFromUrl = exports.setVisibleLayersFromUrl = void 0;
const tslib_1 = require("tslib");
const projection_1 = require("@arcgis/core/geometry/projection");
const SpatialReference_1 = tslib_1.__importDefault(require("@arcgis/core/geometry/SpatialReference"));
const Extent_1 = tslib_1.__importDefault(require("@arcgis/core/geometry/Extent"));
const extentUtil_1 = require("./extentUtil");
const Basemaps_1 = require("@/layers/Basemaps");
const layerUtil_1 = require("./layerUtil");
// Read the URL query parameters...
const params = new URLSearchParams(window.location.search);
/**
 * Make layers in the specified type visible.
 * @param layerList
 */
const setVisibleLayersFromUrl = (layerList) => {
    const param = params.get("featuretype");
    if (param) {
        const layers = param.split(',');
        const layerIds = [];
        console.log(layers);
        layers.forEach((each) => {
            console.log(each);
            layerIds.push(...layerUtil_1.getLayerIds(each));
        });
        layerList.forEach((eachLyr) => {
            if (layerIds.includes(eachLyr.id)) {
                eachLyr.visible = true;
                console.log(eachLyr);
            }
        });
    }
    return layerList;
};
exports.setVisibleLayersFromUrl = setVisibleLayersFromUrl;
/**
 * Get feature ID.
 */
const getFeatureIdFromUrl = () => {
    const id = params.get("featureid");
    return id;
};
exports.getFeatureIdFromUrl = getFeatureIdFromUrl;
/**
 * Get feature type.
 */
const getFeatureTypeFromUrl = () => {
    const type = params.get("featuretype");
    return type;
};
exports.getFeatureTypeFromUrl = getFeatureTypeFromUrl;
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