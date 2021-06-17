import Extent from "@arcgis/core/geometry/Extent";
import SpatialReference from "@arcgis/core/geometry/SpatialReference";
import { whenTrue } from "@arcgis/core/core/watchUtils";

import ExtentInfo from "@/types/ExtentInfo";
import { mapView } from "@/esri-stuff/esriMap";
import ZoomExtentLayer from "@/layers/ZoomExtentLayer";

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

export const zoomOnClick = (extentInfo: ExtentInfo): void => {
    console.log("zoomOnClick");
    const extent = convert2EsriExtent(extentInfo);
    mapView.extent = extent;
    ZoomExtentLayer.visible = false;
    const zoomExtentLayerMaxScale = mapView.scale;
    console.log("C:zoomExtentLayerMaxScale = " + zoomExtentLayerMaxScale);
    const watchHandle = whenTrue(mapView, "stationary", () => {
        if (mapView.scale > zoomExtentLayerMaxScale) {
            ZoomExtentLayer.visible = true;
            console.log("C:ZoomExtentLayer.visible = true");
            watchHandle.remove();
            console.log("C:Removed the watch");
        } else {
            console.log("C:stationary = true");
        }
    });
};

