export const isEsriRows = (obj) => {
    return "features" in obj && Array.isArray(obj.features)
        && obj.features.every((x) => { return "attributes" in x; });
};
export const isEsriFeatures = (obj) => {
    return "features" in obj && "spatialReference" in obj
        && Array.isArray(obj.features)
        && obj.features.every((x) => {
            return "attributes" in x && "geometry" in x;
        });
};
//# sourceMappingURL=typeUtil.js.map