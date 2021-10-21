"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEsriFeatures = exports.isEsriRows = void 0;
const isEsriRows = (obj) => {
    return "features" in obj && Array.isArray(obj.features)
        && obj.features.every((x) => { return "attributes" in x; });
};
exports.isEsriRows = isEsriRows;
const isEsriFeatures = (obj) => {
    return "features" in obj && "spatialReference" in obj
        && Array.isArray(obj.features)
        && obj.features.every((x) => {
            return "attributes" in x && "geometry" in x;
        });
};
exports.isEsriFeatures = isEsriFeatures;
//# sourceMappingURL=typeUtil.js.map