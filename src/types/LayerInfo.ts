class LayerInfo {
    readonly id: string;
    title = "";
    index = -1;
    visible = false;
    url = "";
    status: "none" | "loaded" | "failed" = "none";

    constructor(id: string) {
        this.id = id;
    }
}

export default LayerInfo;