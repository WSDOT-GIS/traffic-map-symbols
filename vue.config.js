const ArcGISPlugin = require("@arcgis/webpack-plugin");

module.exports = {
    // Uncomment below for testing Local Host on BrowserStack
    // devServer: {
    //     disableHostCheck: true
    // },
    publicPath: process.env.NODE_ENV === 'production' ? '/Travel/Real-time/Map/' : '/',
    configureWebpack: {
        devtool: "source-map",
        plugins: [
            new ArcGISPlugin({
                copyAssets: false,
                features: {
                    "3d": false
                },
                userDefinedExcludes: [
                    "@arcgis/core/WebMap",
                    "@arcgis/core/widgets/Popup",
                    "@arcgis/core/PopupTemplate",
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
                    "@arcgis/core/portal/Portal",
                    "@arcgis/core/support/popupUtils",
                    "@arcgis/core/widgets/support/widgetUtils",
                    "@arcgis/core/widgets/Widget",
                    "@arcgis/core/popup/content/FieldsContent",
                    "@arcgis/core/popup/content/ImageMediaInfo",
                    "@arcgis/core/popup/content/MediaContent",
                    "@arcgis/core/popup/content/mixins/ChartMediaInfo",
                    "@arcgis/core/popup/FieldInfo",
                    "@arcgis/core/popup/support/FieldInfoFormat",
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