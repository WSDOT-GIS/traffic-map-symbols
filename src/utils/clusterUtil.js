"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adjustCluster = exports.clusterConfig = void 0;
const tslib_1 = require("tslib");
const FeatureReductionCluster_1 = tslib_1.__importDefault(require("@arcgis/core/layers/support/FeatureReductionCluster"));
const CameraSymbol_1 = require("@/symbols/CameraSymbol");
const maxScale = 19000;
const defaultRadius = 60;
const labelColor = "#fff";
const clusterConfig = new FeatureReductionCluster_1.default({
    clusterRadius: defaultRadius,
    clusterMinSize: 12,
    clusterMaxSize: 25,
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
                xoffset: -3,
                yoffset: -1
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
                xoffset: -3,
                yoffset: -1
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
                xoffset: -3,
                yoffset: -1
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
                xoffset: -3,
                yoffset: -2
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
                xoffset: -5,
                yoffset: -2
            },
            labelPlacement: "center-center",
        },
    ],
});
exports.clusterConfig = clusterConfig;
// The symbol property is undocumented, so use with caution.
// https://community.esri.com/t5/arcgis-api-for-javascript-ideas/arcgis-javascript-4-cluster-renderer/idc-p/1059638#M48
clusterConfig.set("symbol", CameraSymbol_1.clusterSymbol);
// Watch scale change...
const adjustCluster = (newScale, oldScale) => {
    // Reduce cluster radius at max scale...
    if (newScale > maxScale && oldScale < maxScale) {
        clusterConfig.clusterRadius = defaultRadius;
    }
    else if (newScale < maxScale && oldScale > maxScale) {
        clusterConfig.clusterRadius = 10;
    }
};
exports.adjustCluster = adjustCluster;
//# sourceMappingURL=clusterUtil.js.map