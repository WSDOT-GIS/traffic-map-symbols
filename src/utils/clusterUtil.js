"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIdsFromCluster = exports.clusterConfig = exports.clusterMaxScale = void 0;
const tslib_1 = require("tslib");
const FeatureReductionCluster_1 = tslib_1.__importDefault(require("@arcgis/core/layers/support/FeatureReductionCluster"));
const CameraClusterSymbol_1 = tslib_1.__importDefault(require("@/symbols/CameraClusterSymbol"));
const Extent_1 = tslib_1.__importDefault(require("@arcgis/core/geometry/Extent"));
exports.clusterMaxScale = 19000;
const defaultRadius = 60;
const labelColor = "#005151";
const clusterConfig = new FeatureReductionCluster_1.default({
    clusterRadius: defaultRadius,
    clusterMinSize: 20,
    clusterMaxSize: 36,
    labelingInfo: [
        {
            deconflictionStrategy: "none",
            labelExpressionInfo: {
                expression: "IIF($feature.cluster_count < 10, Text($feature.cluster_count, '#,###'), '')"
            },
            symbol: {
                type: "text",
                color: labelColor,
                font: {
                    weight: "bold",
                    family: "Noto Sans",
                    size: "10px"
                },
                // haloColor: "#45b6fe",
                // haloSize: 0
                xoffset: 0,
                yoffset: 0
            },
            labelPlacement: "center-center",
        },
        {
            deconflictionStrategy: "none",
            labelExpressionInfo: {
                expression: "IIF($feature.cluster_count >= 10 && $feature.cluster_count < 50, '10+', '')"
            },
            symbol: {
                type: "text",
                color: labelColor,
                font: {
                    weight: "bold",
                    family: "Noto Sans",
                    size: "10px"
                },
                // haloColor: "#3792cd",
                // haloSize: 1
                xoffset: 0,
                yoffset: 0
            },
            labelPlacement: "center-center",
        },
        {
            deconflictionStrategy: "none",
            labelExpressionInfo: {
                expression: "IIF($feature.cluster_count >= 50 && $feature.cluster_count < 100, '50+', '')"
            },
            symbol: {
                type: "text",
                color: labelColor,
                font: {
                    weight: "bold",
                    family: "Noto Sans",
                    size: "11px"
                },
                // haloColor: "#296d98",
                // haloSize: 1
                xoffset: 0,
                yoffset: 0
            },
            labelPlacement: "center-center",
        }, {
            deconflictionStrategy: "none",
            labelExpressionInfo: {
                expression: "IIF($feature.cluster_count >= 100 && $feature.cluster_count < 200, '100+', '')"
            },
            symbol: {
                type: "text",
                color: labelColor,
                font: {
                    weight: "bold",
                    family: "Noto Sans",
                    size: "12px"
                },
                // haloColor: "#1c4966",
                // haloSize: 1
                xoffset: 0,
                yoffset: 0
            },
            labelPlacement: "center-center",
        }, {
            deconflictionStrategy: "none",
            labelExpressionInfo: {
                expression: "IIF($feature.cluster_count >= 200, Floor($feature.cluster_count, -2) + '+', '')"
            },
            symbol: {
                type: "text",
                color: labelColor,
                font: {
                    weight: "bold",
                    family: "Noto Sans",
                    size: "13px"
                },
                // haloColor: "#0e2433",
                // haloSize: 1,
                xoffset: 0,
                yoffset: 0
            },
            labelPlacement: "center-center",
        },
    ],
});
exports.clusterConfig = clusterConfig;
// The symbol property is undocumented, so use with caution.
// https://community.esri.com/t5/arcgis-api-for-javascript-ideas/arcgis-javascript-4-cluster-renderer/idc-p/1059638#M48
clusterConfig.set("symbol", CameraClusterSymbol_1.default);
// Watch scale change...
// export const adjustCluster = (newScale: number, oldScale: number): void => {
//     // Reduce cluster radius at max scale...
//     if (newScale > clusterMaxScale && oldScale < clusterMaxScale) {
//         clusterConfig.clusterRadius = defaultRadius;
//     }
//     else if (newScale < clusterMaxScale && oldScale > clusterMaxScale) {
//         clusterConfig.clusterRadius = 10;
//     }
// }
/**
Returns IDs of each feature if one of the following coditions is met:
- maxCount is not set
- The number of features is less than the maxCount.
- All the features are at the identical location.
Otherwise returns extent of all features.
*/
const getIdsFromCluster = (clusterGraphic, layer, mapView, maxCount) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const lyr = layer;
    if (!lyr) {
        throw "Only GeoJSONLayer is supported at this time.";
    }
    const layerView = yield mapView.whenLayerView(lyr);
    const query = layerView.createQuery();
    // Object ID of the cluster...
    query.aggregateIds = [clusterGraphic.getObjectId()];
    query.outFields = [lyr.objectIdField];
    const result = yield layerView.queryFeatures(query);
    // let doReturnId = false;
    let extent;
    if (maxCount && result.features.length > maxCount) {
        // let identical = true;
        const pt0 = result.features[0].geometry;
        // Find out extent of all features...
        let minX = pt0.x;
        let maxX = pt0.x;
        let minY = pt0.y;
        let maxY = pt0.y;
        for (let i = 1; i < result.features.length; i++) {
            const pt1 = result.features[i].geometry;
            if (pt1.x < minX) {
                minX = pt1.x;
            }
            else if (pt1.x > maxX) {
                maxX = pt1.x;
            }
            if (pt1.y < minY) {
                minY = pt1.y;
            }
            else if (pt1.y > maxY) {
                maxY = pt1.y;
            }
        }
        if (minX !== maxX || minY !== maxY) {
            extent = new Extent_1.default({
                xmin: minX,
                xmax: maxX,
                ymin: minY,
                ymax: maxY,
                spatialReference: pt0.spatialReference
            });
        }
    }
    if (!extent) {
        const ids = result.features.map((feature) => { return feature.attributes[lyr.objectIdField]; });
        return ids;
    }
    else {
        return extent;
    }
});
exports.getIdsFromCluster = getIdsFromCluster;
//# sourceMappingURL=clusterUtil.js.map