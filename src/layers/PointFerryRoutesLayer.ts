import FeatureLayer from "@arcgis/core/layers/FeatureLayer"
import simpleRenderer from "@arcgis/core/renderers/SimpleRenderer"
import Field from "@arcgis/core/layers/support/Field";
import { alertSymbol } from "@/symbols/AlertSymbol"
import LayerInfo, { LayerStatus } from "@/types/LayerInfo";

const renderer = new simpleRenderer({
    symbol: alertSymbol
})

let layer: FeatureLayer | undefined;

const fields = [
    new Field({
        name: "OBJECTID",
        type: "oid",
        alias: "OBJECTID",
    }),
    new Field({
        name: "Owner",
        type: "string",
        alias: "Owner",
    }),
    new Field({
        name: "SR",
        type: "string",
        alias: "State Route",
    }),
    new Field({
        name: "Display",
        type: "string",
        alias: "Display",
    }),
    new Field({
        name: "FerryRouteID",
        type: "integer",
        alias: "Route ID",
    }),
    new Field({
        name: "START_X",
        type: "double",
        alias: "Start X",
    }),
    new Field({
        name: "START_Y",
        type: "double",
        alias: "START Y",
    }),
    new Field({
        name: "Display",
        type: "string",
        alias: "Display",
    }),
    new Field({
        name: "PublishDate",
        type: "date",
        alias: "Last Update Date"
    })
]

export const layerId = "ferry-routes-points-layer";
const layerTitle = "Ferry Routes Points";

/**
 * @param url
 */
export const initLayer = (url: string): LayerInfo => {
    const layerInfo = new LayerInfo(layerId, layerTitle, url);
    try {
        layer = new FeatureLayer({
            id: layerId,
            url: url,
            title: layerTitle,
            fields: fields,
            renderer: renderer,
            visible: true,
            labelsVisible: false,
            definitionExpression: "Display <> 'Keller South to Keller North'",
            dynamicDataSource: {
                type: "data-layer",
                dataSource: {
                  type: "join-table",
                  leftTableSource: {
                    type: "map-layer",
                    mapLayerId: 2
                  },
                  rightTableSource: {
                    type: "data-layer",
                    dataSource: {
                      type: "table",
                      workspaceId: "CensusFileGDBWorkspaceID",
                      dataSourceName: "ancestry"
                    }
                  },
                  leftTableKey: "STATE_NAME",
                  rightTableKey: "State",
                  joinType: "left-outer-join"
                }
            }
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
        console.error("Ferry Point Layer is not ready yet!");
    }
    return layer;
}

export default getLayer
