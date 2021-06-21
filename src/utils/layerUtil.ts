import FeatureReductionCluster from "@arcgis/core/layers/support/FeatureReductionCluster";

export const generateClusterConfig = (popupTitle: string, name: string, labelColor: string, symbol?: any): FeatureReductionCluster => {

    const clusterConfig = new FeatureReductionCluster({
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
    // The symbol property is undocumented, so use with caution.
    // https://community.esri.com/t5/arcgis-api-for-javascript-ideas/arcgis-javascript-4-cluster-renderer/idc-p/1059638#M48
    if (symbol) {
        clusterConfig.set("symbol", symbol);
    }

    return clusterConfig

}
