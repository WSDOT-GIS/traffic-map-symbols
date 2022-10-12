import { lineAlertSymbolLow, lineAlertSymbolMedium, lineAlertSymbolHigh} from "../symbols/LineAlertSymbol"
import Field from "@arcgis/core/layers/support/Field";
import type FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import * as layerUtil from "../utils/layerUtil";
import LayerInfo, { LayerStatus } from "../types/LayerInfo";
import type Graphic from "@arcgis/core/Graphic";
import UniqueValueRenderer from "@arcgis/core/renderers/UniqueValueRenderer";
const renderer = new UniqueValueRenderer({
    field:"TravelCenterPriorityId",
    uniqueValueInfos: [
        {
            label: "HIGH IMPACT",
            value: 2,
            symbol: lineAlertSymbolHigh
        },
        {
            label: "MODERATE IMPACT",
            value: 3,
            symbol: lineAlertSymbolMedium
        },
        {
            label: "LOW IMPACT",
            value: 4,
            symbol: lineAlertSymbolLow
        },
    ]
})

const fields = [
    /*new Field({ name: "AppGenId",alias: "AppGenId",type: "oid"}),*/
    new Field({ name: "EventID", type: "integer", alias: "EventID"}),
    new Field({ name: "EventCategoryDescription", type: "string", alias: "EventCategoryDescription", length: 400 }),
    new Field({ name: "TravelCenterPriorityId", type: "small-integer", alias: "TravelCenterPriorityId" }),
    new Field({ name: "EventCategoryTypeDescription", type: "string", alias: "EventCategoryTypeDescription", length: 400 }),
    new Field({ name: "EventPriorityID", type: "integer", alias: "EventPriorityID" }),
    new Field({ name: "Road", type: "string", alias: "Road", length: 50 }),
    new Field({ name: "RoadDirection", type: "string", alias: "RoadDirection", length: 15 }),
    new Field({ name: "HeadlineMessage", type: "string", alias: "HeadlineMessage", length: 8000 }),
    new Field({ name: "LastModifiedDate", type: "date", alias: "LastModifiedDate" })
]

let layer: FeatureLayer | undefined;
export const layerId = "line-road-alerts-layer";
const layerTitle = "Road Alert Lines";


 /**
  *
  * @param jsonUrl - 
  */
 export const initLayer = async (jsonUrl: string): Promise<LayerInfo> => {
    const layerInfo = new LayerInfo(layerId, layerTitle, jsonUrl);
    let graphics: Graphic[];

    try {
        graphics = await layerUtil.fetchJsonData(jsonUrl);
        layerInfo.status = LayerStatus.Loaded;
    } catch (ex) {
        console.error(ex);
        graphics = [];
        layerInfo.status = LayerStatus.Failed;
    }

    try {
       // layer = await layerUtil.initLayer(jsonUrl, layerId, layerTitle, renderer, fields, "polyline", true, graphics,"EventCategoryDescription not in ('Closure')");
       layer = await layerUtil.initLayer(layerId, layerTitle, renderer, fields, "polyline", true, graphics,"1=0");
        layer.orderBy = [{
            field: "TravelCenterPriorityId",
            order: "ascending"
        }]
    }
    catch (ex) {
        console.error(ex);
        layerInfo.status = LayerStatus.Failed;
    }
    return layerInfo;
}


/**
 *
 */
const getLayer = (): FeatureLayer | undefined => {
    if (!layer) {
        console.error("LineRoadAlertsLayer is not ready yet!");
    }
    return layer;
}

export default getLayer
