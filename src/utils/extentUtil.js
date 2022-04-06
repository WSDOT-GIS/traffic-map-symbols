import Extent from "@arcgis/core/geometry/Extent";
import SpatialReference from "@arcgis/core/geometry/SpatialReference";
import { WebMercator } from "./miscUtil";
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
export const getExtentInfo = (id) => {
    const result = defaultExtents.filter(x => x.id == id);
    return result[0];
};
export const getEsriExtent = (name) => {
    const info = getExtentInfo(name);
    return convert2EsriExtent(info);
};
export const convert2EsriExtent = (extentInfo) => {
    const extent = new Extent({
        xmin: extentInfo.xmin,
        xmax: extentInfo.xmax,
        ymin: extentInfo.ymin,
        ymax: extentInfo.ymax,
        spatialReference: SpatialReference.WebMercator
    });
    return extent;
};
export const convert2ExtentInfo = (extent) => {
    const info = {
        xmin: extent.xmin,
        xmax: extent.xmax,
        ymin: extent.ymin,
        ymax: extent.ymax
    };
    return info;
};
/**
 * Figure out the relative direction from the full extent.
 * @param mapXY
 * Location to compare against the full extent.
 * @returns
 * First char: vertical direction = i/n/s (inside/north/south)
 * Second char: horizontal direction = i/w/e (inside/west/east)
 */
export const getOutOfBoundDirection = (mapXY, extent) => {
    if (!extent) {
        extent = getExtentInfo("full");
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
    return dir;
};
export const getOutOfExtentPolygons = () => {
    const displayExtent = getEsriExtent("full").expand(1.2);
    const xMin = -20000000;
    const xMax = -1000000;
    const yMin = 0;
    const yMax = 20000000;
    const extentW = new Extent({
        xmin: xMin,
        xmax: displayExtent.xmin,
        ymin: yMin,
        ymax: yMax,
        spatialReference: WebMercator
    });
    const extentN = new Extent({
        xmin: displayExtent.xmin,
        xmax: displayExtent.xmax,
        ymin: displayExtent.ymax,
        ymax: yMax,
        spatialReference: WebMercator
    });
    const extentE = new Extent({
        xmin: displayExtent.xmax,
        xmax: xMax,
        ymin: yMin,
        ymax: yMax,
        spatialReference: WebMercator
    });
    const extentS = new Extent({
        xmin: displayExtent.xmin,
        xmax: displayExtent.xmax,
        ymin: yMin,
        ymax: displayExtent.ymin,
        spatialReference: WebMercator
    });
    return [extentW, extentN, extentE, extentS];
};
//# sourceMappingURL=extentUtil.js.map