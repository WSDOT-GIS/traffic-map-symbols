const ArcGISPlugin = require("@arcgis/webpack-plugin");

module.exports = {
    // Uncomment below for testing Local Host on BrowserStack
    // devServer: {
    //     disableHostCheck: true
    // },
    configureWebpack: {
        devtool: "source-map",
        plugins: [
            new ArcGISPlugin({
                copyAssets: false,
                features: {
                    "3d": true
                },
                userDefinedExcludes: [
                    "@arcgis/core/layers/AreaMeasurementLayer",
                    "@arcgis/core/layers/BingMapsLayer",
                    "@arcgis/core/layers/CSVLayer",
                    "@arcgis/core/layers/GeoRSSLayer",
                    "@arcgis/core/layers/GeoJSONLayer",
                    "@arcgis/core/layers/GroupLayer",
                    "@arcgis/core/layers/ImageryLayer",
                    "@arcgis/core/layers/ImageryTileLayer",
                    "@arcgis/core/layers/KMLLayer",
                    "@arcgis/core/layers/MapNotesLayer",
                    "@arcgis/core/layers/OGCFeatureLayer",
                    "@arcgis/core/layers/OpenStreetMapLayer",
                    "@arcgis/core/layers/StreamLayer",
                    "@arcgis/core/layers/WCSLayer",
                    "@arcgis/core/layers/WFSLayer",
                    "@arcgis/core/layers/WMSLayer",
                    "@arcgis/core/layers/WMTSLayer",
                    "@arcgis/core/layers/WebTileLayer",
                    "@arcgis/core/WebMap",
                    "@arcgis/core/popup",
                    "@arcgis/core/PopupTemplate",
                    "@arcgis/core/portal/Portal",
                    "@arcgis/core/support/popupUtils",
                    "@arcgis/core/widgets/Popup",
                    "@arcgis/core/widgets/support/widgetUtils",
                    "@arcgis/core/widgets/Widget",
                ]
            }),
        ]
    },
    pluginOptions: {
        webpackBundleAnalyzer: {
            openAnalyzer: true
        }
    }
};