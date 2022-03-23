import { lineAlertSymbol} from "../symbols/LineAlertSymbol"
import Field from "@arcgis/core/layers/support/Field";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import * as layerUtil from "@/utils/layerUtil";
import LayerInfo, { LayerStatus } from "@/types/LayerInfo";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
const renderer = new SimpleRenderer({
    symbol: lineAlertSymbol
})

const fields = [
    /*new Field({ name: "AppGenId",alias: "AppGenId",type: "oid"}),*/
    new Field({ name: "EventID", type: "integer", alias: "EventID"})
    /*new Field({ name: "TravelCenterPriorityId", type: "small-integer", alias: "TravelCenterPriorityId" }),
    new Field({ name: "EventCategoryDescription", type: "string", alias: "EventCategoryDescription", length: 400 }),
    new Field({ name: "EventCategoryTypeDescription", type: "string", alias: "EventCategoryTypeDescription", length: 400 }),
    new Field({ name: "EventPriorityID", type: "integer", alias: "EventPriorityID" }),
    new Field({ name: "Road", type: "string", alias: "Road", length: 50 }),
    new Field({ name: "RoadDirection", type: "string", alias: "RoadDirection", length: 15 }),
    new Field({ name: "HeadlineMessage", type: "string", alias: "HeadlineMessage", length: 8000 }),
    new Field({ name: "LastModifiedDate", type: "date", alias: "LastModifiedDate" }),*/
]

let layer: FeatureLayer | undefined;
export const layerId = "line-road-alerts-layer";
const layerTitle = "Road Alert Lines";

/**
 * @param jsonUrl
 */
export const initLayer = async (jsonUrl: string): Promise<LayerInfo> => {
    const layerInfo = new LayerInfo(layerId, layerTitle, jsonUrl);
    try {
        layer = await layerUtil.initLayer(jsonUrl,
            layerId,
            layerTitle,
            renderer,
            fields,
            "polyline",
            true,
        );
    }
    catch (ex) {
        console.error(ex);
        layer = undefined;
        layerInfo.status = LayerStatus.Failed
    }
    // hide all features... Show only when the corresponding point was selected.
    if (layer) {
      //  layer.definitionExpression = "1=0";
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
