import Extent from "@arcgis/core/geometry/Extent";
import SpatialReference from "@arcgis/core/geometry/SpatialReference";

import ExtentInfo from "@/types/ExtentInfo";
import XY from "@/types/XY";

const defaultExtents: ExtentInfo[] = [
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
/**
 * Figure out the relative direction from the full extent.
 * @param mapXY 
 * Location to compare against the full extent.
 * @returns 
 * First char: vertical direction = i/n/s (inside/north/south)
 * Second char: horizontal direction = i/w/e (inside/west/east)
 */
export const getDirectionFromFull = (mapXY: XY): string => {
    const fullExtent = getExtentInfo("full");
    let dir = "i"; // Inside
    // Check vertical...
    if (mapXY.y > fullExtent.ymax) {
        dir = "n";
    } else if (mapXY.y < fullExtent.ymin) {
        dir = "s";
    }
    // Check horizontal...
    if (mapXY.x > fullExtent.xmax) {
        dir += "e";
    } else if (mapXY.x < fullExtent.xmin) {
        dir += "w";
    } else {
        dir += "i";
    }
    console.log("getDirectionFromFull: " + dir);
    return dir;
}

export const getExtentInfo = (id: string): ExtentInfo => {
    const result = defaultExtents.filter(x => x.id == id);
    return result[0];
};

export const getEsriExtent = (name: string): Extent => {
    const info = getExtentInfo(name);
    return convert2EsriExtent(info);
};

export const convert2EsriExtent = (extentInfo: ExtentInfo): Extent => {
    const extent = new Extent({
        xmin: extentInfo.xmin,
        xmax: extentInfo.xmax,
        ymin: extentInfo.ymin,
        ymax: extentInfo.ymax,
        spatialReference: SpatialReference.WebMercator
    })
    return extent;
};

export const convert2ExtentInfo = (extent: Extent): ExtentInfo => {
    const info: ExtentInfo = {
        xmin: extent.xmin,
        xmax: extent.xmax,
        ymin: extent.ymin,
        ymax: extent.ymax
    }
    return info;
};


