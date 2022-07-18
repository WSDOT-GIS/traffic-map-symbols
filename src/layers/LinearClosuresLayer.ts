import { linearCIMClosureSymbol, linearCIMClosureIncreasing, linearCIMClosureDecreasing, linearCIMClosureBoth} from "../symbols/LinearClosureSymbol"
import Field from "@arcgis/core/layers/support/Field";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import * as layerUtil from "@/utils/layerUtil";
import LayerInfo, { LayerStatus } from "@/types/LayerInfo";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import Graphic from "@arcgis/core/Graphic";
import UniqueValueRenderer from "@arcgis/core/renderers/UniqueValueRenderer";
export const simpleClosuresRenderer = new SimpleRenderer({
    symbol: linearCIMClosureSymbol
})
export const directionalClosuresRenderer = new UniqueValueRenderer({
    field:"RoadDirection",
    uniqueValueInfos: [
        {
            label: "Northbound",
            value: "Northbound",
            symbol: linearCIMClosureIncreasing
        },
        {
            label: "Southbound",
            value: "Southbound",
            symbol: linearCIMClosureDecreasing
        },
        {
            label: "Westbound",
            value: "Westbound",
            symbol: linearCIMClosureDecreasing
        },
        {
            label: "Eastbound",
            value: "Eastbound",
            symbol: linearCIMClosureIncreasing
        },
        {
            label: "Both Directions",
            value: "Both Directions",
            symbol: linearCIMClosureBoth

        }
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
export const layerId = "linear-closures-layer";
const layerTitle = "Linear Closures Lines";


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
        layer = await layerUtil.initLayer(layerId, layerTitle, simpleClosuresRenderer, fields, "polyline", true, graphics,"EventCategoryDescription in ('Closure')");
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
