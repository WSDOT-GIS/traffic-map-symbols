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

import LayerInfo from "@/types/LayerInfo";
import { getEsriExtent } from "./extentUtil";
import { getBasemapInfo } from "@/layers/Basemaps";
import BasemapInfo from "@/types/BasemapInfo";
import { getLayerIds } from "./layerUtil";
import { getFeatureByName } from "@/layers/ZoomExtentLayer";
import { RouteLocationNormalizedLoaded } from "vue-router";

// Read the URL query parameters...
const params = new URLSearchParams(window.location.search);
/**
 * Make layers specified layer visible.
 * @param layerList 
 */
export const setVisibleLayersFromUrl = (layerList: LayerInfo[], route: RouteLocationNormalizedLoaded): LayerInfo[] => {
    let layers: string[] | undefined;
    // Check routes...
    if (route.params.layername) {
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
    let param = params.get("featuretype");
    if (param) {
        layers = layers.concat(param.split(','));
    }
    param = params.get("layer");
    if (param) {
        layers = layers.concat(param.split(','));
    }
    if (layers) {
        const layerIds: string[] = [];
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
        })
        layerList.forEach((eachLyr) => {
            if (layerIds.includes(eachLyr.id)) {
                eachLyr.visible = true;
            }
        });
    }
    return layerList;
}

/**
 * Get feature ID.
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
 * Get feature type. 
 */
export const getFeatureTypeFromUrl = (route: RouteLocationNormalizedLoaded): string | null => {
    let type: string | null;
    if (route.params.featuretype) {
        const p = route.params.featuretype;
        type = typeof p === 'string' ? p : p[0];
    } else {
        type = params.get("featuretype");
    }
    return type;
}
/**  Assign extent if it is specified.
     Check namedextent property first, then check the extent property, if nothing or invalid, return full state.
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
            }
        }
    }

    return extent;
}
/**
 * Get extent by name
 * Support route (area\<name>) and query parameter (?namedextent=<name>)
 * @param route 
 */
const getNamedExtentFromUrl = async (route: RouteLocationNormalizedLoaded): Promise<Extent> => {
    let param: string | null;
    if (route.params.areaname) {
        const p = route.params.areaname;
        param = typeof p === 'string' ? p : p[0];
    } else {
        param = params.get("namedextent");
    }
    let extent: Extent | undefined;
    if (param) {
        try {
            const ftr = await getFeatureByName(param);
            extent = ftr.geometry.extent.expand(2);
        }
        catch (ex) {
            console.error(ex);
        }
    }
    if (!extent) {
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