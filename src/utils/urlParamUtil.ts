/*
Support both query parameters and routings
[[ Routings ]]
* /layer/<name>/...
    Make one or more layers visible
* /feature/<layer name>/<feature id>
    Turn on a layer and zoom to a feature and open popup
Sample URLs:
* Make camera layer visible
/layer/camera
* Zoom to a camera with ID 1003
/feature/camera/1003
* Zoom to a restriction and open popup
/feature/restriction/R-WA-290-2 (point)
/feature/restriction/R-WA-101-5 (line)

[[ URL query parameters ]]
* extent
    Comma separated list of xmin, xmax, ymin, ymax in DD format.
    The sequence does not matter.
* namedextent
    seattle, spokane, vancouver, tacoma
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
* Open other popups
?featuretype=restriction&featureid=R-WA-290-2 (point)
?featuretype=restriction&featureid=R-WA-101-5 (line)
?featuretype=alert&featureid=464389
?featuretype=weather&featureid=1909
?featuretype=mountain&featureid=2
?featuretype=time&featureid=4
?featuretype=restriction&featureid=R-WA-101-5&layer=restarea,parkride

[[ Combination ]]
* Zoom to a restriction and also turn on camera and restarea layers
/feature/restriction/R-WA-101-5?layer=camera,restarea
*/

import { project } from "@arcgis/core/geometry/projection";
import SpatialReference from "@arcgis/core/geometry/SpatialReference";
import Extent from "@arcgis/core/geometry/Extent";

import { getEsriExtent } from "./extentUtil";
import { getBasemapInfo } from "../layers/Basemaps";
import type BasemapInfo from "../types/BasemapInfo";
import { getLayerIds } from "./layerUtil";
import * as ZoomExtentLayer from "../layers/ZoomExtentLayer";
import type { RouteLocationNormalizedLoaded } from "vue-router";

const queryStringKeys = ["extent", "namedextent", "base", "layer", "featuretype", "featureid"];
// Read the URL query parameters...
/** Current URL search parameters (aka, query string parameters). (window.location.search) */
const params = new URLSearchParams(window.location.search);
/**
 * Update query string in the URL.
 * Run this after validating and cleaning query string to update URL.
 */
const resetQueryString = () => {
    if (window.history.replaceState) {
        let url = window.location.protocol
            + "//" + window.location.host
            + window.location.pathname
        if (params.toString().length > 0) {
            url += "?"
                + decodeURIComponent(params.toString());
        }
        window.history.replaceState({
            path: url
        }, "", url)
    }
}
/**
 * Check all the keys in the query string and remove invalid ones.
 */
const removeKeys: string[] = [];
params.forEach((value, key) => {
    if (queryStringKeys.indexOf(key) < 0) {
        removeKeys.push(key);
    }
});
removeKeys.forEach((key) => {
    params.delete(key);
});
if (removeKeys.length > 0) {
    resetQueryString();
}

/**
 * Get layer IDs of layers that should be visible from URL
 *
 * @param route  - URL routing
 * @returns object of visible and invisible layer ID arrays 
 */
export const getLayerVisibilityFromUrl = (route: RouteLocationNormalizedLoaded): { visible: string[], invisible: string[] } => {
    let layers: string[] | undefined;
    // Flag to turn off layers shown by default. Currently only the Road Alert layer.
    let hideDefaultLyrs = false;
    // Check routes...
    if (route.params.layername) {
        hideDefaultLyrs = true;
        const p = route.params.layername;
        layers = typeof p === 'string' ? [p] : p;
    }
    else if (route.params.featuretype) {
        const p = route.params.featuretype;
        layers = typeof p === 'string' ? [p] : p;
    }
    // Check query parameters...
    if (!layers) {
        layers = [];
    }
    const type = getFeatureTypeFromQuery();
    if (type) {
        layers.push(type);
    }
    const param = params.get("layer");
    if (param) {
        hideDefaultLyrs = true;
        const layerParams = param.split(',');
        const validLayers = layerParams.filter((item) => {
            return validateLayerName(item);
        });
        if (layerParams.length > validLayers.length) {
            if (validLayers.length > 0) {
                params.set("layer", validLayers.join(","));
            }
            else { params.delete("layer"); }
            resetQueryString();
        }
        layers = layers.concat(validLayers);
    }
    const layerIds: string[] = [];
    const hideLayerIds: string[] = [];
    if (layers) {
        // const layerIds: string[] = [];
        layers.forEach((each) => {
            let ids: string[] | undefined;
            try {
                ids = getLayerIds(each);
            } catch (ex) {
                console.error(ex);
            }
            if (ids) {
                layerIds.push(...ids);
            }
        });
        // Do not show alert layers...
        if (hideDefaultLyrs && !layers.includes("alert")) {
            hideLayerIds.push(...getLayerIds("alert"));//'road-alerts-layer', 'road-closures-layer', 'ferry-routes-points-layer');
        }
    }
    return { visible: layerIds, invisible: hideLayerIds };
}
/**
 * Check to make sure the ID is valid.
 *
 * @param name  - the name of a layer
 * @returns Returns true if valid, false otherwise.
 */
export const validateLayerName = (name: string): boolean => {
    let ids: string[] | undefined;
    try {
        ids = getLayerIds(name);
    } catch (ex) {
        return false;
    }
    if (ids) {
        return true;
    }
    else { return false; }
}
/**
 * Get feature ID from a URL.
 *
 * @param route  - Route URL
 * @returns Returns a feature ID string if one was found, null otherwise.
 */
export const getFeatureIdFromUrl = (route: RouteLocationNormalizedLoaded): string | null => {
    let id: string | null;
    if (route.params.featureid) {
        const p = route.params.featureid;
        id = typeof p === 'string' ? p : p[0];
    } else {
        id = params.get("featureid");
    }
    return id;
}
/** 
 * Get feature type based on the URL. 
 *
 * @param route  - Vue route object
 * @returns Returns a feature type string if one can be determined from the URL. 
 * Otherwise, returns null.
 */
export const getFeatureTypeFromUrl = (route: RouteLocationNormalizedLoaded): string | null => {
    let type: string | null;
    if (route.params.featuretype) {
        const p = route.params.featuretype;
        type = typeof p === 'string' ? p : p[0];
    } else {
        type = getFeatureTypeFromQuery();
    }
    return type;
}
/**
 * Get feature type from the current browser URL search string.
 *
 * @returns returns the feature type if availabe, null otherwise.
 */
const getFeatureTypeFromQuery = (): string | null => {
    let type: string | null = null;
    const param = params.get("featuretype");
    if (param) {
        if (validateLayerName(param)) {
            type = param;
        }
        else {
            params.delete("featuretype");
            if (params.has("featureid")) {
                params.delete("featureid");
            }
            resetQueryString();
        }
    }
    return type;
}
/**
 * Assign extent if it is specified.
 * Check namedextent property first, then check the extent property, if nothing or invalid, return full state.
 *
 * @param route  - Vue route URL object.
 * @returns Returns the extent specified in the URL if available, or "full" if not specified or invalid.
 */
export const getExtentFromUrl = async (route: RouteLocationNormalizedLoaded): Promise<Extent> => {
    let extent = await getNamedExtentFromUrl(route);
    if (!extent) {
        const extentParam = params.get("extent");
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
                else {
                    params.delete("extent");
                    resetQueryString();
                }
            }
        }
    }
    if (!extent) {
        extent = getEsriExtent("full");
    }
    return extent;
}
/**
 * Get extent by name
 * Support route (area\<name\>) and query parameter (?namedextent=\<name\>)
 *
 * @param route  - 
 */
const getNamedExtentFromUrl = async (route: RouteLocationNormalizedLoaded): Promise<Extent | undefined> => {
    let param: string | null;
    if (route.params.areaname) {
        const p = route.params.areaname;
        param = typeof p === 'string' ? p : p[0];
    } else {
        param = params.get("namedextent");
        if (param) {
            if (!validateAreaName(param)) {
                params.delete("namedextent");
                resetQueryString();
                param = null;
            }
        }
    }
    let extent: Extent | undefined;
    if (param) {
        try {
            const ftr = await ZoomExtentLayer.getFeatureByName(param);
            extent = ftr.geometry.extent.expand(2);
        }
        catch (ex) {
            console.error(ex);
        }
    }
    return extent;
}



export const validateAreaName = (name: string): boolean => {
    return ZoomExtentLayer.validateName(name);
}


/**
 *
 */
export const getBasemapFromUrl = (): BasemapInfo => {
    const param = params.get("base");
    const name = param ? param : "";
    const basemapInfo = getBasemapInfo(name);
    if (basemapInfo.name !== param) {
        params.delete("base");
        resetQueryString();
    }
    return basemapInfo;
}