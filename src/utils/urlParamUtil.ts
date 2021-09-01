/*
URL query parameters:
* extent
    Comma separated list of xmin, xmax, ymin, ymax in DD format.
    The sequence does not matter.
* layer
    Comma separated list of layer indices
* base
    Name of the basemap
* type
    Type of the features to turn on. Single type might turn on multiple layers e.g. restriction => point and line layers
    Types: camera, alert, restriction
* id
    Feature ID - if specified in combination with the type parameter, map should zoom to that feature and open popup.
    If the type parameter is not specified, this is ignored.
Sample URLs
Zoom to Seattle metro area and turn off traffic layer, turn on Park & Rides and Traffic Camera layers, satellite basemap
?extent=-122.4489756,47.7741882,-122.1102255,47.5032113&layer=1,2&base=satellite
*/

import { project } from "@arcgis/core/geometry/projection";
import SpatialReference from "@arcgis/core/geometry/SpatialReference";
import Extent from "@arcgis/core/geometry/Extent";

import LayerInfo from "@/types/LayerInfo";
import { getEsriExtent } from "./extentUtil";
import { getBasemapInfo } from "@/layers/Basemaps";
import BasemapInfo from "@/types/BasemapInfo";


// Read the URL query parameters...
const params = new URLSearchParams(window.location.search);

// Assign layer visibility if it is specified...
export const setLayerFromUrl = (layerList: LayerInfo[]): void => {
    const layerParam = params.get("layer");
    if (layerParam) {
        const visibleLayers = layerParam.split(',').map(x => parseInt(x, 10));
        layerList.forEach((eachLyr) => {
            eachLyr.visible = visibleLayers.includes(eachLyr.index);
        });
    }
}

// Assign extent if it is specified.
// If not specified or value is not valid, return full state.
export const getExtentFromUrl = (): Extent => {
    const extentParam = params.get("extent");
    let extent: Extent | undefined;
    if (extentParam) {
        const extentNums = extentParam.split(',').map(
            x => parseFloat(x)).sort((a, b) => { return a - b });
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
                const extentWgs = new Extent({
                    xmin: extentNums[0],
                    xmax: extentNums[1],
                    ymin: extentNums[2],
                    ymax: extentNums[3],
                    spatialReference: SpatialReference.WGS84
                });
                extent = project(extentWgs, SpatialReference.WebMercator) as Extent;
            }
        }
    }
    if (extent === undefined) {
        extent = getEsriExtent("full");
    }

    return extent;
}

export const getBasemapFromUrl = (): BasemapInfo => {
    const param = params.get("base");
    const name = param ? param : "";
    const basemapInfo = getBasemapInfo(name);
    return basemapInfo;
}