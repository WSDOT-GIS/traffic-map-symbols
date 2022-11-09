class LayerInfo {
    constructor(id, title, url) {
        this.title = "";
        this.index = -1;
        this.url = "";
        this.isJson = () => this.url.endsWith(".json");
        this.status = LayerStatus.NotLoaded;
        this.id = id;
        if (title) {
            this.title = title;
        }
        if (url) {
            this.url = url;
        }
    }
}
export var LayerStatus;
(function (LayerStatus) {
    LayerStatus["NotLoaded"] = "not-loaded";
    LayerStatus["Loading"] = "loading";
    LayerStatus["Loaded"] = "loaded";
    LayerStatus["Failed"] = "failed";
})(LayerStatus || (LayerStatus = {}));
export default LayerInfo;
/**
 *
 * @param obj
 */
export const isLayerInfo = (obj) => {
    if (obj.id) {
        return true;
    }
    return false;
};
/**
 *
 * @param esriStatus
 */
export const esriStatus2LayerStatus = (esriStatus) => {
    const status = esriStatus;
    if (Object.values(LayerStatus).indexOf(status) < 0) {
        return undefined;
    }
    return status;
};
//# sourceMappingURL=LayerInfo.js.map