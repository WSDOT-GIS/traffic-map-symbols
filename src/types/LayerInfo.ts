class LayerInfo {
    readonly id: string;
    title = "";
    index = -1;
    visible = false;
    url = "";
    status: "not-loaded" | "loading" | "loaded" | "failed" = "not-loaded";

    constructor(id: string) {
        this.id = id;
    }
}

export default LayerInfo;