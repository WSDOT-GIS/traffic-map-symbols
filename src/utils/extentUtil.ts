import Extent from "@arcgis/core/geometry/Extent";
import SpatialReference from "@arcgis/core/geometry/SpatialReference";

import ExtentInfo from "@/types/ExtentInfo";

const defaultExtents: ExtentInfo[] = [
    {
        id: "full",
        title: "Full extent",
        xmin: -13911155.7073957,
        xmax: -12984203.1967109,
        ymin: 5704865.77272526,
        ymax: 6316025.98739708,
    },
];

export const GetExtentInfo = (id: string): ExtentInfo => {
    const result = defaultExtents.filter(x => x.id == id);
    return result[0];
};

export const GetEsriExtent = (name: string): Extent => {
    const info = GetExtentInfo(name);
    return Convert2EsriExtent(info);
};

export const Convert2EsriExtent = (extentInfo: ExtentInfo): Extent => {
    const extent = new Extent({
        xmin: extentInfo.xmin,
        xmax: extentInfo.xmax,
        ymin: extentInfo.ymin,
        ymax: extentInfo.ymax,
        spatialReference: SpatialReference.WebMercator
    })
    return extent;
};

export const Convert2ExtentInfo = (extent: Extent): ExtentInfo => {
    const info: ExtentInfo = {
        xmin: extent.xmin,
        xmax: extent.xmax,
        ymin: extent.ymin,
        ymax: extent.ymax
    }
    return info;
};
