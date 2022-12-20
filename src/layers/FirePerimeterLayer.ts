import FeatureLayer from "@arcgis/core/layers/FeatureLayer"
import simpleRenderer from "@arcgis/core/renderers/SimpleRenderer"
import firePerimeterSymbol from "../symbols/FirePerimeterSymbol"
import LayerInfo, { LayerStatus } from "../types/LayerInfo";

const firePerimeterRenderer = new simpleRenderer({
    symbol: firePerimeterSymbol
})
let layer: FeatureLayer | undefined;
export const layerId = "fire-perimeters-layer";
const layerTitle = "Fire Perimeters";

/**
 * @param url - 
 * @param incidentNames - 
 */
export const initLayer = (url: string, incidentNames: string[]): LayerInfo => {
    const layerInfo = new LayerInfo(layerId, layerTitle, url);
    const queryString = "IncidentName IN('" + incidentNames.join("','") + "')";
    // console.log(queryString);
    try {
        layer = new FeatureLayer({
            id: layerId,
            renderer: firePerimeterRenderer,
            url: url,
            title: layerTitle,
            visible: false,
            definitionExpression: queryString,
            copyright: undefined
        });
    }
    catch (ex) {
        console.error(ex);
        layer = undefined;
        layerInfo.status = LayerStatus.Failed
    }
    return layerInfo;
}


/**
 *
 */
const getLayer = (): FeatureLayer | undefined => {
    if (!layer) {
        console.error("Fire Perimeters is not ready yet!");
    }
    return layer;
}

export default getLayer
