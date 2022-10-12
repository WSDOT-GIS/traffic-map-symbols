import FeatureLayer from "@arcgis/core/layers/FeatureLayer"
import simpleRenderer from "@arcgis/core/renderers/SimpleRenderer"
import fireIncidentSymbol from "../symbols/FireIncidentSymbol"
import LayerInfo, { LayerStatus } from "../types/LayerInfo";
import Graphic from "@arcgis/core/Graphic";


const fireIncidentRenderer = new simpleRenderer({
    symbol: fireIncidentSymbol
})

let layer: FeatureLayer | undefined;
export const layerId = "fire-incidents-layer";
const layerTitle = "Fire Incidents";



export const initLayer = (url: string): LayerInfo => {
    const layerInfo = new LayerInfo(layerId, layerTitle, url);
    try {
        layer = new FeatureLayer({
            id: layerId,
            url: url,
            title: layerTitle,
            renderer: fireIncidentRenderer,
            visible: false,
            definitionExpression: "POOState= 'US-WA'",
            labelsVisible: false,
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
        console.error("Fire Incident is not ready yet!");
    }
    return layer;
}

export default getLayer


/**
 *
 */
export const getIncidentNames = async (): Promise<string[]> => {
    if (!layer) {
        console.error("Failed to get fire incident names since the layer is not available.");
        return [];
    }
    const fireIncidentQuery = layer.createQuery();
    fireIncidentQuery.outFields = ["IncidentName"];
    let features: Graphic[];
    try {
        const response = await layer.queryFeatures(fireIncidentQuery);
        features = response.features;
    } catch (ex) {
        console.error(ex)
        return [];
    }
    const names = features.map(ftr => ftr.attributes.IncidentName as string);
    return names;
}
