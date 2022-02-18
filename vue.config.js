/* eslint-disable @typescript-eslint/no-var-requires */
const ArcGISPlugin = require("@arcgis/webpack-plugin");
const zlib = require("zlib");

module.exports = {
  // Uncomment below for testing Local Host on BrowserStack
  // devServer: {
  //     disableHostCheck: true
  // },
  publicPath: process.env.NODE_ENV === "production" ? "/Travel/Real-time/Map/" : "/",
  configureWebpack: {
    devtool: "source-map",
    plugins: [
      new ArcGISPlugin({
        copyAssets: false,
        features: {
          "3d": false,
        },
        userDefinedExcludes: [
          // ignore these layers
          "@arcgis/core/layers/AreaMeasurementLayer",
          "@arcgis/core/layers/BuildingSceneLayer",
          "@arcgis/core/layers/BingMapsLayer",
          "@arcgis/core/layers/CSVLayer",
          "@arcgis/core/layers/DirectLineMeasurementLayer",
          "@arcgis/core/layers/GeoRSSLayer",
          "@arcgis/core/layers/GeoJSONLayer",
          "@arcgis/core/layers/GroupLayer",
          "@arcgis/core/layers/ImageryLayer",
          "@arcgis/core/layers/ImageryTileLayer",
          "@arcgis/core/layers/IntegratedMeshLayer",
          "@arcgis/core/layers/KMLLayer",
          "@arcgis/core/layers/MapNotesLayer",
          "@arcgis/core/layers/OGCFeatureLayer",
          "@arcgis/core/layers/OpenStreetMapLayer",
          "@arcgis/core/layers/StreamLayer",
          "@arcgis/core/layers/SubtypeGroupLayer",
          "@arcgis/core/layers/WCSLayer",
          "@arcgis/core/layers/WFSLayer",
          "@arcgis/core/layers/WMSLayer",
          "@arcgis/core/layers/WMTSLayer",
          "@arcgis/core/layers/WebTileLayer",
          // identity
          "@arcgis/core/identity",
        ],
      }),
    ],
  },
  pluginOptions: {
    webpackBundleAnalyzer: {
      openAnalyzer: false,
    },
    compression: {
      brotli: {
        filename: "[file].br[query]",
        algorithm: "brotliCompress",
        include: /\.(js|css|svg)(\?.*)?$/i,
        compressionOptions: {
          params: {
            [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
          },
        },
        minRatio: 0.9,
      },
      gzip: {
        filename: "[file].gz[query]",
        algorithm: "gzip",
        include: /\.(js|css|svg)(\?.*)?$/i,
        minRatio: 0.9,
      },
    },
  },
};
