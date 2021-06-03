import Basemap from "@arcgis/core/Basemap";
import TileLayer from "@arcgis/core/layers/TileLayer";

const urlBasemap =
    "https://data.wsdot.wa.gov/arcgis/rest/services/Shared/WebBaseMapWebMercator/MapServer";

export const wsdotBasemap = new Basemap({
    baseLayers: [
        new TileLayer({
            url: urlBasemap,
        }),
    ],
    title: "WSDOT Basemap",
    id: "wsdot-basemap",
});

export const satelliteBasemap = Basemap.fromId("satellite")