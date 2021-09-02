/*
URL query parameters:
* extent
    Comma separated list of xmin, xmax, ymin, ymax in DD format.
    The sequence does not matter.
* base
    Name of the basemap
* layer
    Layers to turn on
* featuretype
    Type of feature to turn on. Single type might turn on multiple layers e.g. restriction => point and line layers
    Types: camera, alert, restriction
* featureid
    Feature ID - if specified in combination with the type parameter, map should zoom to that feature and open popup.
    If the type parameter is not specified, this is ignored.
Sample URLs:
* Zoom to Seattle metro area and turn on Park & Rides and Traffic Camera layers, satellite basemap
?extent=-122.4489756,47.7741882,-122.1102255,47.5032113&layer=camera,parkride&base=satellite
* Open camera popup with ID
?featuretype=camera&featureid=1001
?featuretype=restriction&featureid=R-WA-290-2
?featuretype=alert&featureid=464389
?featuretype=weather&featureid=1909
?featuretype=mountain&featureid=2
?featuretype=time&featureid=4
*/

import { project } from "@arcgis/core/geometry/projection";
import SpatialReference from "@arcgis/core/geometry/SpatialReference";
import Extent from "@arcgis/core/geometry/Extent";

import LayerInfo from "@/types/LayerInfo";
import { getEsriExtent } from "./extentUtil";
import { getBasemapInfo } from "@/layers/Basemaps";
import BasemapInfo from "@/types/BasemapInfo";
import { getLayerIds } from "./layerUtil";


// Read the URL query parameters...
const params = new URLSearchParams(window.location.search);
/**
 * Make layers in the specified type visible.
 * @param layerList 
 */
export const setVisibleLayersFromUrl = (layerList: LayerInfo[]): void => {
    const typeParam = params.get("layer");
    if (typeParam) {
        const types = typeParam.split(',');
        const layerIds: string[] = [];
        types.forEach((eachType) => {
            layerIds.push(...getLayerIds(eachType));
        })
        layerList.forEach((eachLyr) => {
            if (layerIds.includes(eachLyr.id)) {
                eachLyr.visible = true;
            }
        });
    }
}
/**
 * Get feature ID.
 */
export const getFeatureIdFromUrl = () => {
    const id = params.get("featureid");
    return id;
}
/** 
 * Get feature type. 
 */
export const getFeatureTypeFromUrl = () => {
    const type = params.get("featuretype");
    return type;
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