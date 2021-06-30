import FeatureReductionCluster from "@arcgis/core/layers/support/FeatureReductionCluster";

export const generateClusterConfig = (popupTitle: string, name: string, labelColor: string, symbol?: any): FeatureReductionCluster => {

    const clusterConfig = new FeatureReductionCluster({
        clusterRadius: "80px",
        clusterMinSize: "16px",
        clusterMaxSize: "32px",
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
                        size: "11px"
                    },
                    haloColor: "#45b6fe",
                    haloSize: 0
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
                        size: "11px"
                    },
                    haloColor: "#3792cd",
                    haloSize: 1
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
                    haloColor: "#296d98",
                    haloSize: 1
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
                        size: "11px"
                    },
                    haloColor: "#1c4966",
                    haloSize: 1
                },
                labelPlacement: "center-center",
            }, {
                deconflictionStrategy: "none",
                labelExpressionInfo: {
                    expression: "IIF($feature.cluster_count >= 200, '200+', '')"
                },
                symbol: {
                    type: "text",
                    color: labelColor,
                    font: {
                        weight: "bold",
                        family: "Noto Sans",
                        size: "11px"
                    },
                    haloColor: "#0e2433",
                    haloSize: 1
                },
                labelPlacement: "center-center",
            }
        ],
        // popupTemplate: {
        //     title: popupTitle,
        //     content: "{cluster_count} " + name + "s exist in this area. Zoom to locate the individual " + name + "s or click \"Browse features\".",
        //     fieldInfos: [{
        //         fieldName: "cluster_count",
        //         format: {
        //             places: 0,
        //             digitSeparator: true
        //         }
        //     }]
        // },
    });
    // The symbol property is undocumented, so use with caution.
    // https://community.esri.com/t5/arcgis-api-for-javascript-ideas/arcgis-javascript-4-cluster-renderer/idc-p/1059638#M48
    if (symbol) {
        clusterConfig.set("symbol", symbol);
    }

    return clusterConfig

}
