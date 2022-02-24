import FeatureLayer from "@arcgis/core/layers/FeatureLayer"
import simpleRenderer from "@arcgis/core/renderers/SimpleRenderer"
import fireIncidentSymbol from "@/symbols/FireIncidentSymbol"
import LayerInfo, { LayerStatus } from "@/types/LayerInfo";


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
            labelsVisible: false
        });
    }
    catch (ex) {
        console.error(ex);
        layer = undefined;
        layerInfo.status = LayerStatus.Failed
    }
    return layerInfo;
}

const getLayer = (): FeatureLayer | undefined => {
    if (!layer) {
        console.error("Fire Incident is not ready yet!");
    }
    return layer;
}

export default getLayer
