"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convert2ExtentInfo = exports.convert2EsriExtent = exports.getEsriExtent = exports.getExtentInfo = void 0;
const tslib_1 = require("tslib");
const Extent_1 = tslib_1.__importDefault(require("@arcgis/core/geometry/Extent"));
const SpatialReference_1 = tslib_1.__importDefault(require("@arcgis/core/geometry/SpatialReference"));
const defaultExtents = [
    {
        id: "full",
        title: "Full extent",
        xmin: -13899444.6466, ymin: 5707531.072999999,
        xmax: -13014945.794, ymax: 6275274.968499999
        // xmin: -13911155.7073957,
        // xmax: -12984203.1967109,
        // ymin: 5704865.77272526,
        // ymax: 6316025.98739708,
    },
];
const getExtentInfo = (id) => {
    const result = defaultExtents.filter(x => x.id == id);
    return result[0];
};
exports.getExtentInfo = getExtentInfo;
const getEsriExtent = (name) => {
    const info = exports.getExtentInfo(name);
    return exports.convert2EsriExtent(info);
};
exports.getEsriExtent = getEsriExtent;
const convert2EsriExtent = (extentInfo) => {
    const extent = new Extent_1.default({
        xmin: extentInfo.xmin,
        xmax: extentInfo.xmax,
        ymin: extentInfo.ymin,
        ymax: extentInfo.ymax,
        spatialReference: SpatialReference_1.default.WebMercator
    });
    return extent;
};
exports.convert2EsriExtent = convert2EsriExtent;
const convert2ExtentInfo = (extent) => {
    const info = {
        xmin: extent.xmin,
        xmax: extent.xmax,
        ymin: extent.ymin,
        ymax: extent.ymax
    };
    return info;
};
exports.convert2ExtentInfo = convert2ExtentInfo;
//# sourceMappingURL=extentUtil.js.map