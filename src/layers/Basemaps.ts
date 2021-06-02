import Basemap from "@arcgis/core/Basemap";
import MapImageLayer from "@arcgis/core/layers/MapImageLayer";

const urlBasemap =
    "https://data.wsdot.wa.gov/arcgis/rest/services/Shared/WebBaseMapWebMercator/MapServer";

export const wsdotBasemap = new Basemap({
    baseLayers: [
        new MapImageLayer({
            url: urlBasemap,
        }),
    ],
    title: "WSDOT Basemap",
    id: "wsdot-basemap",
});

export const satelliteBasemap = Basemap.fromId("satellite")