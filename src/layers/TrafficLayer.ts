import MapImageLayer from "@arcgis/core/layers/MapImageLayer";

let layer: MapImageLayer | undefined;
export const layerId = "traffic-flow-layer";

export const initLayer = (url: string, refreshMinute: number): MapImageLayer | undefined => {
    try {
        layer = new MapImageLayer({
            id: layerId,
            url: url,
            sublayers: [
                { id: 6, visible: true, title: "Live Traffic Flow" }, // live traffic
                // { id: 2, visible: false }, // incidents overview: critical and major incidents
                // { id: 4, visible: true }, // incidents detail: critical, major, minor as well as low impact incidents
            ],
            refreshInterval: refreshMinute,
        });
    } catch (ex) {
        console.error(ex);
    }
    return layer;
}

const getLayer = (): MapImageLayer | undefined => {
    if (!layer) {
        console.error("TrafficLayer is not ready yet!");
    }
    return layer;
}

export default getLayer