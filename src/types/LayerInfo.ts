class LayerInfo {
    readonly id: string;
    title = "";
    index = -1;
    visible = false;
    url = "";
    status = LayerStatus.NotLoaded;

    constructor(id: string, title?: string) {
        this.id = id;
        if (title) {
            this.title = title;
        }
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