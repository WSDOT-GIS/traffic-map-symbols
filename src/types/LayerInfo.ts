class LayerInfo {
    readonly id: string;
    title = "";
    index = -1;
    visible: boolean | undefined;
    url = "";
    isJson = false;
    status = LayerStatus.NotLoaded;

    constructor(id: string, title?: string, url?: string, isJson?: boolean) {
        this.id = id;
        if (title) { this.title = title; }
        if (url) { this.url = url; }
        if (isJson) { this.isJson = isJson; }
    }
}

export enum LayerStatus {
    NotLoaded = "not-loaded", Loading = "loading", Loaded = "loaded", Failed = "failed"
}

export default LayerInfo;

export const isLayerInfo = (obj: unknown): obj is LayerInfo => {
    if ((obj as LayerInfo).id) {
        return true;
    }
    return false;
}

export const esriStatus2LayerStatus = (esriStatus: string): LayerStatus | undefined => {
    const status = esriStatus as LayerStatus;
    if (Object.values(LayerStatus).indexOf(status) < 0) {
        return undefined;
    }
    return status;

}