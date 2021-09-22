"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOutOfBoundDirection = exports.convert2ExtentInfo = exports.convert2EsriExtent = exports.getEsriExtent = exports.getExtentInfo = void 0;
const tslib_1 = require("tslib");
const Extent_1 = tslib_1.__importDefault(require("@arcgis/core/geometry/Extent"));
const SpatialReference_1 = tslib_1.__importDefault(require("@arcgis/core/geometry/SpatialReference"));
const defaultExtents = [
    {
        id: "full",
        title: "Full extent",
        xmin: -13899444.6466,
        xmax: -13014945.794,
        ymin: 5667345.69,
        ymax: 6329128.62 // Includes Vancouver, BC
    },
    {
        id: "wa",
        title: "Washington state extent",
        xmin: -13899444.6466, ymin: 5707531.072999999,
        xmax: -13014945.794, ymax: 6275274.968499999
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
/**
 * Figure out the relative direction from the full extent.
 * @param mapXY
 * Location to compare against the full extent.
 * @returns
 * First char: vertical direction = i/n/s (inside/north/south)
 * Second char: horizontal direction = i/w/e (inside/west/east)
 */
const getOutOfBoundDirection = (mapXY, extent) => {
    if (!extent) {
        extent = exports.getExtentInfo("full");
    }
    let dir = "i"; // Inside
    // Check vertical...
    if (mapXY.y > extent.ymax) {
        dir = "n";
    }
    else if (mapXY.y < extent.ymin) {
        dir = "s";
    }
    // Check horizontal...
    // console.log("X:" + mapXY.x + " Min:" +extent.xmin + " Max:" + extent.xmax)
    // Note: the values are negative...
    if (mapXY.x < extent.xmin) {
        dir += "w";
    }
    else if (mapXY.x > extent.xmax) {
        dir += "e";
    }
    else {
        dir += "i";
    }
    // console.log("getOutOfBoundDirection: " + dir);
    return dir;
};
exports.getOutOfBoundDirection = getOutOfBoundDirection;
//# sourceMappingURL=extentUtil.js.map