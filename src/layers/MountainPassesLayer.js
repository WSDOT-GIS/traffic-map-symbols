"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const GeoJSONLayer_1 = tslib_1.__importDefault(require("@arcgis/core/layers/GeoJSONLayer"));
const SimpleRenderer_1 = tslib_1.__importDefault(require("@arcgis/core/renderers/SimpleRenderer"));
const MountainPassSymbol_1 = tslib_1.__importDefault(require("@/symbols/MountainPassSymbol"));
// import MountainPassesInfo from "@/types/MountainPassesInfo";
// import Graphic from "@arcgis/core/Graphic";
const mountainPassRenderer = new SimpleRenderer_1.default({
    symbol: MountainPassSymbol_1.default
});
const FeatureLayer = new GeoJSONLayer_1.default({
    id: "mountain-passes-layer",
    url: "http://hqtob1webtmdev1/GISData/MountainPasses.json",
    title: "Mountain Passes",
    renderer: mountainPassRenderer,
    visible: false
});
exports.default = FeatureLayer;
//# sourceMappingURL=MountainPassesLayer.js.map