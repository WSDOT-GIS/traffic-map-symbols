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
define(["require", "exports", "tslib", "@arcgis/core/geometry/projection", "@arcgis/core/geometry/SpatialReference", "@arcgis/core/geometry/Extent", "./extentUtil", "@/layers/Basemaps"], function (require, exports, tslib_1, projection_1, SpatialReference_1, Extent_1, extentUtil_1, Basemaps_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getBasemapFromUrl = exports.getExtentFromUrl = exports.setLayerFromUrl = void 0;
    SpatialReference_1 = tslib_1.__importDefault(SpatialReference_1);
    Extent_1 = tslib_1.__importDefault(Extent_1);
    // Read the URL query parameters...
    var params = new URLSearchParams(window.location.search);
    // Assign layer visibility if it is specified...
    var setLayerFromUrl = function (layerList) {
        var layerParam = params.get("layer");
        if (layerParam) {
            var visibleLayers_1 = layerParam.split(',').map(function (x) { return parseInt(x, 10); });
            layerList.forEach(function (eachLyr) {
                eachLyr.visible = visibleLayers_1.includes(eachLyr.index);
            });
        }
    };
    exports.setLayerFromUrl = setLayerFromUrl;
    // Assign extent if it is specified.
    // If not specified or value is not valid, return full state.
    var getExtentFromUrl = function () {
        var extentParam = params.get("extent");
        var extent;
        if (extentParam) {
            var extentNums = extentParam.split(',').map(function (x) { return parseFloat(x); }).sort(function (a, b) { return a - b; });
            if (extentNums.length == 4) {
                var isValid = true;
                for (var i = 0; i < 4; i++) {
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
                    var extentWgs = new Extent_1.default({
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
    var getBasemapFromUrl = function () {
        var param = params.get("base");
        var name = param ? param : "";
        var basemapInfo = Basemaps_1.getBasemapInfo(name);
        return basemapInfo;
    };
    exports.getBasemapFromUrl = getBasemapFromUrl;
});
//# sourceMappingURL=urlParamUtil.js.map