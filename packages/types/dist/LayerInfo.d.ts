declare class LayerInfo {
    readonly id: string;
    title: string;
    index: number;
    visible: boolean | undefined;
    url: string;
    isJson: () => boolean;
    status: LayerStatus;
    constructor(id: string, title?: string, url?: string);
}
export declare enum LayerStatus {
    NotLoaded = "not-loaded",
    Loading = "loading",
    Loaded = "loaded",
    Failed = "failed"
}
export default LayerInfo;
/**
 *
 * @param obj
 */
export declare const isLayerInfo: (obj: unknown) => obj is LayerInfo;
/**
 *
 * @param esriStatus
 */
export declare const esriStatus2LayerStatus: (esriStatus: string) => LayerStatus | undefined;
//# sourceMappingURL=LayerInfo.d.ts.map