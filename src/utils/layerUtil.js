define(["require", "exports", "tslib", "@arcgis/core/layers/support/FeatureReductionCluster"], function (require, exports, tslib_1, FeatureReductionCluster_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.generateClusterConfig = void 0;
    FeatureReductionCluster_1 = tslib_1.__importDefault(FeatureReductionCluster_1);
    var generateClusterConfig = function (popupTitle, name, labelColor) {
        var clusterConfig = new FeatureReductionCluster_1.default({
            clusterRadius: "100px",
            clusterMinSize: "30px",
            clusterMaxSize: "60px",
            labelingInfo: [{
                    deconflictionStrategy: "none",
                    labelExpressionInfo: {
                        expression: "Text($feature.cluster_count, '#,###')"
                    },
                    symbol: {
                        type: "text",
                        color: labelColor,
                        font: {
                            weight: "bold",
                            family: "Noto Sans",
                            size: "12px"
                        },
                        haloColor: "white",
                        haloSize: 1
                    },
                    labelPlacement: "center-center",
                }],
            popupTemplate: {
                title: popupTitle,
                content: "{cluster_count} " + name + "s exist in this area. Zoom to locate the individual " + name + "s or click \"Browse features\".",
                fieldInfos: [{
                        fieldName: "cluster_count",
                        format: {
                            places: 0,
                            digitSeparator: true
                        }
                    }]
            },
        });
        return clusterConfig;
    };
    exports.generateClusterConfig = generateClusterConfig;
});
//# sourceMappingURL=layerUtil.js.map