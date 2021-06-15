define(["require", "exports", "tslib", "@arcgis/core/geometry/Extent", "@arcgis/core/geometry/SpatialReference"], function (require, exports, tslib_1, Extent_1, SpatialReference_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Convert2ExtentInfo = exports.Convert2EsriExtent = exports.GetEsriExtent = exports.GetExtentInfo = void 0;
    Extent_1 = tslib_1.__importDefault(Extent_1);
    SpatialReference_1 = tslib_1.__importDefault(SpatialReference_1);
    var defaultExtents = [
        {
            id: "full",
            title: "Full extent",
            xmin: -13911155.7073957,
            xmax: -12984203.1967109,
            ymin: 5704865.77272526,
            ymax: 6316025.98739708,
        },
    ];
    var GetExtentInfo = function (id) {
        var result = defaultExtents.filter(function (x) { return x.id == id; });
        return result[0];
    };
    exports.GetExtentInfo = GetExtentInfo;
    var GetEsriExtent = function (name) {
        var info = exports.GetExtentInfo(name);
        return exports.Convert2EsriExtent(info);
    };
    exports.GetEsriExtent = GetEsriExtent;
    var Convert2EsriExtent = function (extentInfo) {
        var extent = new Extent_1.default({
            xmin: extentInfo.xmin,
            xmax: extentInfo.xmax,
            ymin: extentInfo.ymin,
            ymax: extentInfo.ymax,
            spatialReference: SpatialReference_1.default.WebMercator
        });
        return extent;
    };
    exports.Convert2EsriExtent = Convert2EsriExtent;
    var Convert2ExtentInfo = function (extent) {
        var info = {
            xmin: extent.xmin,
            xmax: extent.xmax,
            ymin: extent.ymin,
            ymax: extent.ymax
        };
        return info;
    };
    exports.Convert2ExtentInfo = Convert2ExtentInfo;
});
//# sourceMappingURL=extentUtil.js.map