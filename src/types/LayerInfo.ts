class LayerInfo {
    readonly id: string;
    title = "";
    index = -1;
    visible = false;
    url = "";
    status = LayerStatus.NotLoaded;//"not-loaded" | "loading" | "loaded" | "failed" = "not-loaded";

    constructor(id: string, title: string) {
        this.id = id;
        this.title = title;
    }
}

export enum LayerStatus {
    NotLoaded = "not-loaded", Loading = "loading", Loaded = "loaded", Failed = "failed"
}

export default LayerInfo;