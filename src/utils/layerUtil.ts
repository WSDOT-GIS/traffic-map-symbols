import FeatureReductionCluster from "@arcgis/core/layers/support/FeatureReductionCluster";

export const generateClusterConfig = (popupTitle: string, name: string, labelColor: string) => {

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
            content: "{cluster_count} " + name + "s exist in this area. Zoom to locate the individual " + name + "s or click \"Browse features\" below.",
            fieldInfos: [{
                fieldName: "cluster_count",
                format: {
                    places: 0,
                    digitSeparator: true
                }
            }]
        },
    });
    return clusterConfig

}
