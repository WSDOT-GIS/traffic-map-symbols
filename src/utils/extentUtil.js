import Extent from "@arcgis/core/geometry/Extent";
import SpatialReference from "@arcgis/core/geometry/SpatialReference";
const defaultExtents = [
    {
        id: "full",
        title: "Full extent",
        xmin: -13911155.7073957,
        xmax: -12984203.1967109,
        ymin: 5704865.77272526,
        ymax: 6316025.98739708,
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
//# sourceMappingURL=extentUtil.js.map